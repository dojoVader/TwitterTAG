import React from "react";
import "./FaxMailComponent.css";

type FaxMailProps = {
  name: string;
};

export const FaxMailComponent = (props: FaxMailProps) => {
  const { name } = props;

  return (
    <>
      <div className="fax-mail-main__container">
        {/* Fax Mail Heading Content */}
        <div className="fax__mail-head">
          <h1 className="fax-mail-heading">{name}</h1>
        </div>

        {/* Fax-mail Body Content */}
        <div className="fax-mail-body-content">
          <h2 className="heading-secondary">Your Temporary Email Address</h2>

          <form action="">
            <input
              className="fax-mail__input"
              type="email"
              name="email"
              id="email"
              placeholder="mail@faxmail.co"
            />

            <div className="fax-mail__btns">
              <button className="fax-mail__btn fax-mail__btn--blue">
                Change
              </button>
              <button className="fax-mail__btn fax-mail__btn--gray">
                Copy
              </button>
            </div>
          </form>
        </div>

        <div className="fax-mail__input fax-mail__inbox">Inbox card</div>
      </div>
    </>
  );
};
