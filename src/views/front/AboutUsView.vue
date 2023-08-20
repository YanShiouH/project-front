<template>
  <v-container>
    <v-row class="max-width-1080">
      <v-col cols="12" class="text-center">
        <h1 class="mb-3">About Us</h1>
        <p class="subheading">Welcome to Taealam, your gateway to learning Arabic!</p>
        <p class="about-text">We are a passionate group of language enthusiasts dedicated to helping you explore the
          beauty of the Arabic
          language and culture.</p>
      </v-col>
      <v-col cols="12" class="mt-5">
        <h2 class="subtitle-1">Frequently Asked Questions</h2>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel v-for="(item, index) in faqItems" :key="index" :title="item.question" :text="item.answer"
            readonly>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" class="mt-5 max-width-512">
        <h2 class="subtitle-1">Contact Us</h2>
        <v-form @submit.prevent="submitForm" id="myForm">
          <v-text-field label="Name" v-model="contactForm.name" required></v-text-field>
          <v-text-field label="Email" v-model="contactForm.email" required></v-text-field>
          <v-text-field label="Subject" v-model="contactForm.subject" required></v-text-field>
          <v-textarea label="Message" v-model="contactForm.message" required></v-textarea>
          <v-col col="12" class="d-flex justify-end mt-3">
            <v-btn variant="text" type="reset" color="error" @click="resetForm">Reset</v-btn>
            <v-btn variant="elevated" type="submit" color="primary" class="ml-2">Submit</v-btn></v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import emailjs from 'emailjs-com' // Import the emailjs library

const faqItems = [
  {
    question: 'What courses are currently available?',
    answer: 'We currently offer beginner-level language courses in a variety of languages. Stay tuned for upcoming advanced and intermediate courses in the near future!'
  },
  {
    question: 'How can I register for a course?',
    answer: 'Registering for a course is a simple process. Begin by creating an account, then explore our course offerings and select the one that aligns with your learning objectives. Click the "Get Startedl" button to commence your learning journey. Please note that while our courses are free, but an account is required for access.'
  },
  {
    question: 'Can I access the courses on mobile devices?',
    answer: 'Absolutely! Our courses are designed to be accessible on various devices, including smartphones and tablets, so you can learn on the go.'
  },
  {
    question: 'What if I need additional help or support?',
    answer: 'If you need assistance or have questions, our support team is available. Contact us via the form on this page for help with inquiries or any issues you encounter. We\'re dedicated to ensuring a seamless experience for you.'
  },
  {
    question: 'Is there a community or discussion forum for learners?',
    answer: 'Yes, we have an active community of learners and a discussion forum where you can connect with fellow learners, ask questions, and share your experiences.'
  }
]

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required()
})

const submitForm = async () => {
  try {
    await schema.validate(contactForm.value, { abortEarly: false })

    const templateParams = {
      to_email: 'machichioz79@gmail.com',
      from_name: contactForm.value.name,
      from_email: contactForm.value.email,
      subject: contactForm.value.subject,
      message: contactForm.value.message
    }

    const response = await emailjs.send(
      'service_dgqnwlj',
      'template_grnvf2q',
      templateParams,
      'E9O3osL8tLn5HfqTG'
    )

    console.log('Email sent successfully:', response)

    contactForm.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    console.error('Validation errors or sending email error:', error)
  }
}

const resetForm = () => {
  contactForm.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}
</script>

<style lang="sass" scope>
.subheading
  font-size: 24px
  font-weight: bold
  color: #FF6F61

.about-text
  font-size: 20px
  color: #333

.v-expansion-panels--variant-accordion
  font-size:20px
.v-expansion-panel-title
  font-size: 20px
.max-width-512
  max-width: 512px
  margin: 0 auto
</style>
