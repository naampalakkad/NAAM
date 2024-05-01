'use client';
import React, { useState } from 'react'; 
import './about.css';

export default function AboutComponent() {
    return (
        <div className="container">
        <div className="title">
          <h1 className="subTitle">Come to Learn,</h1>
          <h1 className="subTitle">Leave to Serve</h1>
        </div>
        <div className="description">
          <p>Welcome to our website! We are dedicated to providing...</p>
          <p>More information about our association...</p>
        </div>
      </div>
    );
}
