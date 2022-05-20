import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Captcha(props) {
  return (
    <div className="App">
      <ReCAPTCHA
        ref = {props.extRef}
        sitekey={import.meta.env.VITE_CAPTCHA_PUBLIC}
        theme="dark"
      />
    </div>
  );
};