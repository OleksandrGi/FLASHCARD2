import React, { ChangeEvent, useState } from "react";

const Account = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div>
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {image && <img src={image} alt="Uploaded" style={{ maxWidth: "200px" }} />}
        </div>
        <span>Name</span>
        <p>Oleksandr</p>
        <span>Last Name</span>
        <p>Borysenko</p>
        <span>Daily Goal</span>
        <p>Daily Work Hours Goal</p>
        <em>Your email: nincisncew@gmail.com</em>
        <p>Your password:</p>
        <input type="password" value="12345678" readOnly />
        <p>Your progress:</p>
        <div>
          <p>Your last added cards:</p>
          <div>hello</div>
          <div>beaver</div>
          <div>world</div>
          <div>sheep</div>
        </div>
      </div>
    </>
  );
};

export default Account;
