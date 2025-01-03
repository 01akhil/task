import React from "react";
import useTypingEffect from "../hooks/useTypingEffect";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  const fullTitle = "Brring all your tasks Increase your productivity";
  const displayedTitle = useTypingEffect(fullTitle);
  return (
    <div className="h-screen w-full bg-gradient-to-r from-[#6b44ad] to-[#e851b4] flex items-center justify-center">
      <div className="text-sm w-[40vw]">
        <h1 className="h-20">{displayedTitle}</h1>

        <div className="flex gap-3 mt-[10vh]">
          <button
            className="bg-blue-400 w-[10vw]"
            onClick={() => navigate("/login")}
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="w-[40vw] h-[60vh]">
        <img
          src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp"
          alt=""
        />
      </div>
    </div>
  );
};

export default Landing;
