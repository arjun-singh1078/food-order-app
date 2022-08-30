import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5;

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalcode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalcode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameInputClasses = `${classes.control} ${
    !formInputValidity.name ? classes.invalid : ""
  }`;
  const streetInputClasses = `${classes.control} ${
    !formInputValidity.street ? classes.invalid : ""
  }`;
  const postalcodeInputClasses = `${classes.control} ${
    !formInputValidity.postalcode ? classes.invalid : ""
  }`;
  const cityInputClasses = `${classes.control} ${
    !formInputValidity.city ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Enter a valid name.</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Enter a valid street.</p>}
      </div>
      <div className={postalcodeInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postalcode && (
          <p>Enter a valid postal code (5 characters).</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
