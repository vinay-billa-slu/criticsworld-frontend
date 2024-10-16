import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="divider"></div>
            {/* <div className="footer-brand-wrapper">
              <a href="/" className="">
                <img className="" src="./assets/images/logo1.svg" alt="Movie Lover logo"/>
              </a>

              <ul className="footer-list">
                <li>
                  <a href="#" className="footer-link">
                    Go To Movies List
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>

        <div className="footer-bottom">
          {/* <div className="container"> */}
            {/* <div className="quicklink-wrapper">
              <ul className="quicklink-list">
                <li>
                  <a href="#" className="quicklink-link">
                    Faq
                  </a>
                </li>

                <li>
                  <a href="#" className="quicklink-link">
                    Help center
                  </a>
                </li>

                <li>
                  <a href="#" className="quicklink-link">
                    Terms of use
                  </a>
                </li>

                <li>
                  <a href="#" className="quicklink-link">
                    Privacy
                  </a>
                </li>
              </ul>
            </div> */}
            <p className="copyright">
              &copy; 2023{" "}
              <a href="#" className="font-bold">
                Movie Lover
              </a>
              . All Rights Reserved
            </p>
          {/* </div> */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
