import React, { useEffect, useState } from "react";

const GoTopButton = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY >= 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a href="#top" className="go-top" data-go-top>
      <ion-icon name="chevron-up"></ion-icon>
    </a>
  );
};

export default GoTopButton;
