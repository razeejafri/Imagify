# AI Text-to-Image Generator

[![React](https://img.shields.io/badge/React-v18-blue)](https://reactjs.org/) 
[![Express](https://img.shields.io/badge/Express-Node.js-green)](https://expressjs.com/) 
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)](https://www.mongodb.com/) 
[![JWT](https://img.shields.io/badge/JWT-Authentication-yellow)](https://jwt.io/) 
[![ClipDrop API](https://img.shields.io/badge/ClipDrop-AI-red)](https://clipdrop.co/api) 
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment-blue)](https://razorpay.com/)

[Live Demo](#) • [Backend API](#) • [Issues](#)

---

## Project Overview
AI Text-to-Image Generator is a full-stack SaaS app where users generate images from text prompts using AI. Users authenticate, spend credits to generate images, and can purchase more credits via Razorpay.

---

## Features
- Generate AI images from text prompts via ClipDrop API.
- Secure auth with JWT + MongoDB.
- Credit-based usage with purchase flow (Razorpay).
- Responsive UI built with React.js + Tailwind CSS.
- Image history and account management.

---

## Tech Stack
- Frontend: React.js, Tailwind CSS
- Backend: Express.js, Node.js
- Database: MongoDB (Mongoose)
- Auth: JWT
- AI API: ClipDrop
- Payments: Razorpay
- Others: Axios

---

## Screenshots
![Homepage](screenshots/homepage.png)
![Image Generation](screenshots/generation.png)
![Credit System](screenshots/credits.png)

Place images in a /screenshots folder at the repo root.

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm (or pnpm/yarn)
- MongoDB (local or Atlas)
- ClipDrop API key
- Razorpay account (Key ID/Secret)

### Environment Variables

Create server/.env:
