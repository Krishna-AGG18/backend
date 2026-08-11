import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskAPI } from '@/api/tasks.api';
import { useParams } from 'react-router-dom';
import { MoreHorizontal, Calendar, MessageSquare, Paperclip, Plus } from 'lucide-react';
import { CreateTaskModal } from './CreateTaskModal';

export const TasksBoard = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialStatus, setModalInitialStatus] = useState('todo');

  const { data, isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => TaskAPI.getTasks(projectId),
    enabled: !!projectId
  });

  const updateTaskMutation = useMutation({
    mutationFn: TaskAPI.updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', projectId]);
    }
  });

  const [columns, setColumns] = useState({
    'todo': { id: 'todo', title: 'To Do', taskIds: [] },
    'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: [] },
    'review': { id: 'review', title: 'Review', taskIds: [] },
    'completed': { id: 'completed', title: 'Completed', taskIds: [] }
  });

  const [tasksMap, setTasksMap] = useState({});

  useEffect(() => {
    if (data?.data?.tasks) {
      const newTasksMap = {};
      const newColumns = {
        'todo': { id: 'todo', title: 'To Do', taskIds: [] },
        'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: [] },
        'review': { id: 'review', title: 'Review', taskIds: [] },
        'completed': { id: 'completed', title: 'Completed', taskIds: [] }
      };

      data.data.tasks.forEach(task => {
        const id = task._id;
        newTasksMap[id] = task;
        
        let colId = 'todo';
        if (task.status === 'in_progress') colId = 'in-progress';
        if (task.status === 'in_review') colId = 'review';
        if (task.status === 'done') colId = 'completed';

        if (newColumns[colId]) {
          newColumns[colId].taskIds.push(id);
        }
      });

      setTasksMap(newTasksMap);
      setColumns(newColumns);
    }
  }, [data]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });

    // Update backend status
    let newStatus = 'todo';
    if (newFinish.id === 'in-progress') newStatus = 'in_progress';
    if (newFinish.id === 'review') newStatus = 'in_review';
    if (newFinish.id === 'completed') newStatus = 'done';

    updateTaskMutation.mutate({
      projectId,
      taskId: draggableId,
      data: { status: newStatus }
    });
  };

  if (isLoading) {
    return <div className="text-[#a1a1aa] p-6">Loading tasks...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 h-full overflow-x-auto pb-4 hide-scrollbar">
        {Object.values(columns).map((column) => (
          <div key={column.id} className="flex flex-col min-w-[320px] w-[320px] shrink-0">
            {/* Column Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[13px] font-medium text-white flex items-center gap-2">
                {column.title}
                <span className="bg-white/10 text-[#a1a1aa] px-2 py-0.5 rounded-full text-[11px]">
                  {column.taskIds.length}
                </span>
              </h3>
              <button 
                onClick={() => {
                  setModalInitialStatus(
                    column.id === 'in-progress' ? 'in_progress' :
                    column.id === 'review' ? 'in_review' :
                    column.id === 'completed' ? 'done' : 'todo'
                  );
                  setIsModalOpen(true);
                }}
                className="text-[#a1a1aa] hover:text-white transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 rounded-xl p-2 transition-colors ${
                    snapshot.isDraggingOver ? 'bg-white/5' : 'bg-transparent'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    {column.taskIds.map((taskId, index) => {
                      const task = tasksMap[taskId];
                      if (!task) return null;
                      return (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-[#12101b] border border-white/5 p-4 rounded-xl cursor-grab active:cursor-grabbing hover:border-white/10 transition-colors ${
                                snapshot.isDragging ? 'shadow-2xl shadow-black/50 rotate-2' : ''
                              }`}
                            >
                              <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-semibold px-2 py-1 rounded-md uppercase ${
                                  task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                                  task.priority === 'medium' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' :
                                  'bg-blue-500/10 text-blue-400'
                                }`}>
                                  {task.priority || 'low'}
                                </span>
                                <button className="text-[#a1a1aa] hover:text-white transition-colors">
                                  <MoreHorizontal size={14} />
                                </button>
                              </div>
                              <h4 className="text-[14px] text-white font-medium mb-2 leading-snug">
                                {task.name}
                              </h4>
                              <p className="text-[12px] text-[#a1a1aa] line-clamp-2 mb-4">
                                {task.description || "No description"}
                              </p>
                              <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-3 text-[#a1a1aa]">
                                  {task.dueDate && (
                                    <div className="flex items-center gap-1.5 text-[11px]">
                                      <Calendar size={12} />
                                      {new Date(task.dueDate).toLocaleDateString()}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5 text-[11px]">
                                    <MessageSquare size={12} />
                                    0
                                  </div>
                                </div>
                                <div className="flex -space-x-1.5">
                                  {task.assignees && task.assignees.slice(0,2).map((a, i) => (
                                    <img 
                                      key={i} 
                                      src={a.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${a.username}`}
                                      className="w-6 h-6 rounded-full border border-[#12101b] bg-black" 
                                      alt="assignee"
                                      title={a.username}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialStatus={modalInitialStatus}
      />
    </DragDropContext>
  );
};
