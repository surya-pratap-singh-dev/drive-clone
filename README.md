# 🚀 Drive Clone - Cloud Storage Application

A full-stack cloud storage application built with Node.js, Express, MongoDB, and Supabase. Upload, manage, and share your files securely with a modern, Google Drive-inspired interface.

![Drive Clone](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## 📸 Screenshots












## ✨ Features

- 📤 **File Upload & Download** - Drag-and-drop file uploads with progress tracking
- 📁 **File Management** - Organize, rename, and delete files easily
- ⭐ **Favorites** - Mark important files for quick access
- 🔍 **Search Functionality** - Find files instantly by name or tags
- 📊 **Activity Tracking** - Monitor downloads and file access history
- 🔐 **Secure Authentication** - User registration and login with Supabase Auth
- 💾 **Cloud Storage** - Files stored securely on Supabase Storage
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 📱 **Mobile Responsive** - Works seamlessly on all devices

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for metadata storage
- **Mongoose** - MongoDB object modeling

### Frontend
- **EJS** - Templating engine
- **Tailwind CSS** - Utility-first CSS framework
- **Flowbite** - UI component library
- *(UI design AI-assisted)*
  
### Authentication & Storage
- **Supabase** - Backend-as-a-Service (Auth + Storage)
- **bcrypt** - Password hashing
- **cookie-parser** - HTTP cookie parsing

### Development Tools
- **dotenv** - Environment variable management
- **nodemon** - Auto-restart server during development

## 📁 Project Structure

drive-clone/
├── config/
│ ├── db.js # MongoDB connection
│ └── supabaseClient.js # Supabase configuration
├── models/
│ ├── files.model.js # File metadata schema
│ ├── folder.model.js # Folder schema
│ ├── activity.model.js # Activity tracking
│ ├── shareLink.model.js # Shareable links
│ └── user.model.js # User schema
├── routes/
│ ├── index.routes.js # Home & dashboard routes
│ ├── user.routes.js # Auth routes
│ ├── files.routes.js # File operations API
│ └── folders.routes.js # Folder operations API
├── views/
│ ├── home.ejs # Dashboard
│ ├── login.ejs # Login page
│ └── register.ejs # Registration page
├── .env # Environment variables (not in repo)
├── .gitignore
├── app.js # Entry point
├── package.json
└── README.md


## 🚀 Quick Start

### 1. Clone & Install
git clone https://github.com/YOUR_USERNAME/drive-clone.git
cd drive-clone
npm install


### 2. Environment Variables
Create `.env` file:
MONGODB_URI=your_mongodb_connection_string
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
JWT_SECRET=your_secret
PORT=3000MONGODB_URI=your_mongodb_connection_string
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
JWT_SECRET=your_secret
PORT=3000



### 3. Setup
- Create MongoDB Atlas cluster → Copy connection string
- Create Supabase project → Create bucket named `drive-bucket` (public)
- Add credentials to `.env`

### 4. Run
npm start

Visit `http://localhost:3000` 🎉

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Register user |
| POST | `/users/login` | Login user |
| POST | `/api/files/save-file` | Upload file |
| GET | `/api/files/user-files/:userId` | Get files |
| DELETE | `/api/files/delete/:fileId` | Delete file |
| POST | `/api/files/favorite/:fileId` | Toggle favorite |




## 👨‍💻 Author

**Suryaa**  
GitHub: [@FAKE-SURYA](https://github.com/FAKE-SURYA)

## 📝 License

MIT License - feel free to use this project!

---

⭐ **Star this repo if you found it helpful!**

