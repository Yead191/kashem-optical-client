import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import faqLottie from "../../assets/faq.json";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const Faq = () => {
  const faqData = [
    {
      id: "q1",
      question: "How do I choose the right lenses for my glasses?",
      answer:
        "At Kashem Optical, you can select lenses based on your prescription, lifestyle, and preferences. Use our lens guide to choose from single vision, bifocal, or progressive lenses, and add coatings like anti-glare or blue light protection. If you’re unsure, contact our support team for personalized advice.",
    },
    {
      id: "q2",
      question: "Can I order glasses without a prescription?",
      answer:
        "Yes, you can order non-prescription glasses, such as blue light blocking or fashion glasses, directly from our website. Simply select 'No Prescription' during checkout and customize your frame and lens options.",
    },
    {
      id: "q3",
      question: "How do I submit my prescription?",
      answer:
        "After choosing your glasses, upload your prescription during the order process or email it to us later. You can also enter your prescription details manually on our website. We accept prescriptions from any licensed optometrist.",
    },
    {
      id: "q4",
      question: "What is your shipping and delivery time?",
      answer:
        "We offer free standard shipping on all orders within [your country/region]. Standard delivery takes 5-7 business days, while express shipping takes 2-3 business days. You’ll receive a tracking link once your order ships.",
    },
    {
      id: "q5",
      question: "What is your return and exchange policy?",
      answer:
        "Kashem Optical offers a 30-day return policy for unused glasses in original condition. If you’re not satisfied, return them for a full refund or exchange. Prescription lenses may incur a restocking fee due to customization. Check our Returns page for details.",
    },
    {
      id: "q6",
      question: "Do you offer lens coatings or add-ons?",
      answer:
        "Yes, we provide a variety of lens coatings, including anti-scratch, anti-reflective, UV protection, and blue light filtering. You can customize these options during the lens selection process to enhance your glasses’ performance and comfort.",
    },
    {
      id: "q7",
      question: "How can I book an eye test with Kashem Optical?",
      answer:
        "You can book an eye test at one of our partnered optical stores through our website. Select 'Book Eye Test,' choose a location, and pick a convenient time slot. We’ll confirm your appointment via email.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className=" my-8 relative rounded-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="container mx-auto px-4 lg:px-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 py-10 xl:py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <Lottie
              className="w-full lg:w-10/12"
              animationData={faqLottie}
              loop
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h5 className="text-xs font-semibold text-[#006eff]">
              FREQUENTLY ASKED QUESTIONS
            </h5>
            <h2 className="text-3xl lg:text-4xl font-bold lg:text-left mb-6">
              Kashem Optical FAQ <br className="hidden lg:flex" /> Guide
            </h2>
            <Accordion type="single" collapsible>
              {faqData.map(({ id, question, answer }) => (
                <AccordionItem key={id} value={id}>
                  <AccordionTrigger className="cursor-pointer">
                    {question}
                  </AccordionTrigger>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <AccordionContent>{answer}</AccordionContent>
                  </motion.div>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Faq;
