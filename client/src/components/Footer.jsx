export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-10 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
                <div>
                    <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="/dashboard" className="hover:underline">My Bookings</a></li>
                        <li><a href="/BookRoom" className="hover:underline">Available Rooms</a></li>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 mb-4">Contact & Support</h4>
                    <p>Email: support@swahilipothub.com</p>
                    <p>Phone: +254 700 000 000</p>
                    <p>Mombasa, Kenya</p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 mb-4">Hours</h4>
                    <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p>Sat: 9:00 AM - 1:00 PM</p>
                </div>
            </div>
            <div className="text-center mt-10 text-gray-400 border-t border-gray-100 pt-4">
                &copy; 2026 Swahilipot Hub. All rights reserved.
            </div>
        </footer>
    );
}