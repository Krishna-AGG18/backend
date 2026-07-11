### Lecture Overview
This lecture focused on how to handle file uploads (attachments like images, PDFs, CSVs) in an Express.js application. Since Express does not natively support handling multipart/form-data (file uploads), the instructor introduced **Multer**, a popular third-party middleware used alongside Express for this specific purpose.

The instructor walked through installing Multer, setting up a custom storage engine using `diskStorage`, and creating a reusable middleware to handle incoming files.

---

### What the Code Does (Explanation)

The code creates a dedicated middleware file (`multer.middleware.js`) that configures how and where uploaded files are stored on the server.

Here is a breakdown of the key technical implementations:

#### 1. Disk Storage Configuration
Multer's `diskStorage` engine is used to give full control over storing files to disk. It requires defining two properties: `destination` and `filename`.

```javascript
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/images`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
```

*   **`destination`**: A function that determines which folder the uploaded files should be saved in. In this case, they are being saved to the `./public/images` directory. The callback (`cb`) is called with `null` as the first argument (indicating no error) and the path as the second argument.
*   **`filename`**: A function that determines what the file should be named once it is saved. If we just use the original name, two users uploading a file named `avatar.png` might overwrite each other. To prevent this, the code prepends the current timestamp (`Date.now()`) to the `file.originalname`, ensuring uniqueness (e.g., `1691234567890-avatar.png`).

#### 2. Initializing and Exporting Multer
After configuring the storage engine, the `multer` instance is initialized and exported so it can be used in the routing layer.

```javascript
export const upload = multer({
    storage,
    limits : {
        fileSize: 1 * 1000 * 1000,
    }
})
```

*   **`storage`**: Passes the previously defined disk storage configuration to Multer.
*   **`limits`**: Defines constraints on the uploaded file. Here, the `fileSize` limit is set to `1 * 1000 * 1000` bytes, which equates to **1 Megabyte (MB)**.

#### 3. How it's Used (Conceptual)
As discussed in the lecture, this exported `upload` middleware will later be injected into specific routes (e.g., `router.post('/upload', upload.single('avatar'), ...)`). Multer will intercept the request, save the file to the `./public/images` directory, and then populate the `req.file` or `req.files` object for the actual route controller to use.

### Key Takeaways
*   **Express needs help for files:** Express alone cannot parse file uploads; it relies on middleware like Multer.
*   **Preventing name collisions:** Always modify the uploaded file's name (e.g., using timestamps or UUIDs) to prevent users from accidentally overwriting each other's files.
*   **File Limits:** Setting limits like `fileSize` is crucial for security and managing server resources to prevent users from uploading massive files.
