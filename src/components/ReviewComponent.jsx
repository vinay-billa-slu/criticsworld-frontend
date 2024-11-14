import React from "react";

function ReviewComponent({
  user,
  item,
  isValid,
  handleEditReview,
  handleDeleteReview,
}) {
  return (
    <article className="mb-4">
      <div className="flex items-center">
        <img
          className="w-10 h-10 me-4 rounded-full"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt=""
        />
        <div className="font-medium dark:text-white">
          <p className="font-bold">
            {item.FirstName} {item.LastName}{" "}
            <time
              datetime={new Date(user.Timestamp).toDateString()}
              className="block text-sm text-gray-500 dark:text-gray-400"
            >
              Joined on {new Date(user.Timestamp).toDateString()}
            </time>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        {[1, 2, 3, 4, 5].map((value, key) => (
          <svg
            key={key}
            className="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill={value <= item.Rating ? "red" : "gray"}
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
        {/* <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Should buy this.
                      </h3> */}
      </div>
      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p className="text-[#cacaca]">
          Reviewed on{" "}
          <time datetime={new Date(item.Timestamp).toDateString()}>
            {new Date(item.Timestamp).toDateString()}
          </time>
        </p>
      </footer>
      <p className="mb-2 text-sm text-[#cacaca]">{item.ReviewTitle}</p>
      {/* <button className="block underline text-white mb-5 text-sm font-medium hover:text-customRed">
                        Read more
                      </button> */}
      {isValid && (
        <aside>
          <div className="flex items-center text-white">
            <button
              onClick={handleEditReview}
              className="font-bold text-sm hover:text-customRed hover:underline"
            >
              Edit
            </button>
            <div className="h-6 w-[2px] bg-customRed mx-2"></div>
            <button
              onClick={() => {
                const val = window.confirm("Do you want to delete?");
                if (val) {
                  handleDeleteReview(item);
                }
              }}
              className="font-bold text-sm hover:text-customRed hover:underline"
            >
              Delete
            </button>
          </div>
        </aside>
      )}
    </article>
  );
}

export default ReviewComponent;
