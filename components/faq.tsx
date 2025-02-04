import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "What is a favicon?",
    answer:
      "A favicon is a small icon associated with a website or web page. It's displayed in the browser's address bar, tabs, bookmarks, and other areas to help users identify your site visually.",
  },
  {
    question: "Why do I need different favicon sizes?",
    answer:
      "Different devices and platforms require different favicon sizes for optimal display. For example, desktop browsers, mobile devices, and various operating systems each have their own preferred favicon dimensions.",
  },
  {
    question: "What file formats does this generator support?",
    answer:
      "Our favicon generator supports various input formats, including PNG, JPEG, and SVG. It then generates favicons in ICO, PNG, and SVG formats to ensure compatibility across all platforms.",
  },
  {
    question: "How do I implement the generated favicons on my website?",
    answer:
      "After generating your favicons, you'll receive a zip file containing all the necessary files and an HTML code snippet. Simply extract the files to your website's root directory and paste the provided HTML code into the <head> section of your web pages.",
  },
  {
    question: "Is this favicon generator free to use?",
    answer:
      "Yes, our favicon generator is completely free to use. You can generate as many favicon packages as you need without any cost or limitations.",
  },
]

export default function FAQ() {
  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

