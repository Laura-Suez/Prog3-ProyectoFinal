import React from "react";
import Layout from "../Layout/Layout";
import ContacForm from "../ContactForm/ContacForm";
import FaqAccordion from "../FAQ/FaqAccordion";

const ContactUs = () => {
  return (
    <>
      <Layout>
        <ContacForm />
        <FaqAccordion />
      </Layout>
    </>
  );
};

export default ContactUs;
