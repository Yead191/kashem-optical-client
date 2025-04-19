# 👓 Kashem Optical – Lens Selling Web Application (Client)

Kashem Optical is a modern, responsive, and feature-rich lens selling web application built with React, Tailwind CSS, Firebase, and more. It offers a seamless user experience for both customers and administrators, with functionalities including cart management, order tracking, patient prescription handling, and detailed sales reporting.

![Kashem Optical Screenshot](https://i.ibb.co.com/yFhgT441/Screenshot-2025-04-20-at-2-22-25-AM.png)

---

## 📚 Table of Contents

- [Features](#features)
- [Pages Overview](#pages-overview)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## ✨ Features

- 🔐 JWT-based route protection for admin dashboard
- 📦 Cart management and purchase history for users
- 📄 Users can download their invoice after order confirmation (PDF)
- 📊 Admin dashboard with sales reports and statistics
- 🧾 PDF & CSV export for sales reports
- 📝 Patient record management with printable prescriptions
- 📱 Fully responsive design using Tailwind CSS and ShadCN UI
- 🌐 Smooth navigation with React Router
- 🔥 Firebase Authentication and Hosting support

---

## 📄 Pages Overview

### Public Pages:
- **Home**
- **Shop**
- **Product Details**
- **About Us**
- **Contact Us**

### User Dashboard:
- **Manage Cart** – Add, remove, or update products in cart.
- **Purchase History** – View and download invoices after order confirmation.

### Admin Dashboard:
> Protected using JWT and private routes.

- **Statistics** – View application insights.
- **Sales Report** – Export reports as PDF or CSV.
- **Manage Users** – Admin user controls.
- **Manage Categories** – Product categorization.
- **Manage Products** – Add, edit, or remove lenses.
- **Manage Orders** – Track and manage customer orders.
- **Manage Banners** – Homepage banner control.
- **Manage Patients** – View and print prescriptions (OD, OS records).

---

## 🧰 Tech Stack

### Frontend:
- **React 19**
- **React Router DOM 7**
- **Tailwind CSS + ShadCN + DaisyUI**
- **Firebase**
- **Axios**
- **React Hook Form**, **React Query**, **SweetAlert2**, **Recharts**, **Swiper.js**
- **@react-pdf/renderer**, **xlsx** (for exports)

### UI Components & Helpers:
- Radix UI (Accordion, Avatar, Checkbox, Dialog, etc.)
- Lucide, Heroicons, Headless UI
- Framer Motion, Motion, Lottie

### Build & Tooling:
- Vite
- ESLint
- PostCSS
- TailwindCSS Animate

---

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/kashem-optical-client.git
cd kashem-optical-client

# Install dependencies
npm install

# Start development server
npm run dev
