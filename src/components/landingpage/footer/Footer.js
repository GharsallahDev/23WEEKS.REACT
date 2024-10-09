import { useState } from 'react';
import { Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-p6/80 text-black">
      <div className="flex flex-col md:flex-row">
        {/* Left side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between background-image">
          <nav className="mb-12">
            <ul className="space-y-4 pl-32 font-medium">
              {['Features', 'Pricing', 'FAQ', 'Download'].map((item) => (
                <li
                  key={item}
                  className="transform transition-transform duration-300 hover:translate-x-2"
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-xl text-p7 hover:text-pink-950 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm text-p7 mt-auto pl-32 flex justify-between items-center">
            <p>© {new Date().getFullYear()}, 23 Weeks</p>
            <div className="space-x-4">
              <a href="/privacy" className="hover:text-pink-950 transition-colors">
                Privacy policy
              </a>
              <span className="text-pink-900">•</span> {/* Optional separator */}
              <a href="/terms" className="hover:text-pink-950 transition-colors">
                Terms of service
              </a>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 bg-p7 p-8 md:p-12 lg:p-16 flex flex-col justify-between">
          <div className="space-y-6">
            <h2
              className="text-4xl font-bold mb-4 animate-fade-in-down"
              style={{ color: '#dd1367' }}
            >
              Subscribe
            </h2>
            <p className="text-gray-700 mb-4 animate-fade-in-up">
              Sign up to our newsletter for feature updates and our undying love.
            </p>
            <form onSubmit={handleSubmit} className="flex animate-fade-in">
              <input
                type="email"
                placeholder="your.email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-black border border-[#dd1367] rounded-l-full rounded-r-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#de4c89] transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-[#dd1367] hover:bg-[#de4c89] text-white rounded-l-none rounded-r-full px-6 py-2 transition-all duration-300"
              >
                →
              </button>
            </form>
          </div>
          <div className="mt-8 text-center">
            <p className="text-xl font-semibold mb-4" style={{ color: '#dd1367' }}>
              Connect with us
            </p>
            <div className="flex justify-center space-x-4">
              {[
                { icon: <Linkedin className="w-6 h-6 text-p6 hover:text-p7" />, label: 'Linkedin' },
                {
                  icon: <Instagram className="w-6 h-6 text-p6 hover:text-p7" />,
                  label: 'Instagram',
                },
                // Add more social icons if needed
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="bg-white p-2 rounded-full hover:bg-p6 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#dd1367] focus:ring-opacity-50"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
