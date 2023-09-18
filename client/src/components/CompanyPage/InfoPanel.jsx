import { useState } from "react";

export default function InfoPanel() {

  return (
    <div className="mx-auto p-5 mt-2 bg-neutral rounded-box border-accent border-[1rem]">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold mb-4">Business Details</h2>
        <a href="https://coffeeshop.com" className="text-blue-500 hover:underline mb-4 block">Visit Coffee Shop Website</a>
        <hr className="my-4" />
        <p className="mb-4">123 Coffee Lane, Java City, 12345</p>
        <hr className="my-4" />
        <p>(555) 123-4567</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Store Hours</h2>
        <ul>
          <li>Monday: 8:00 AM - 8:00 PM</li>
          <li>Tuesday: 8:00 AM - 8:00 PM</li>
          <li>Wednesday: 8:00 AM - 8:00 PM</li>
          <li>Thursday: 8:00 AM - 8:00 PM</li>
          <li>Friday: 8:00 AM - 9:00 PM</li>
          <li>Saturday: 9:00 AM - 9:00 PM</li>
          <li>Sunday: 9:00 AM - 6:00 PM</li>
        </ul>
      </div>
    </div>
  );
}