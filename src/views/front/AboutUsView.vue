<template>
  <v-container>
    <v-row class="max-width-1080">
      <v-col cols="12" class="mb-5">
        <h1 class="mb-3 text-center">About Us</h1>
        <p class="subheading">Welcome to Taealam, your gateway to learning Arabic!</p>
        <p class="about-text">We are a passionate group of language enthusiasts dedicated to helping you explore the
          beauty of the Arabic
          language and culture.</p>
      </v-col>
      <v-divider class="my-8"></v-divider>
      <v-col cols="12" class="my-5">
        <h2 class="faq">Frequently Asked Questions</h2>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel v-for="(item, index) in faqItems" :key="index" :title="item.question" :text="item.answer"
            readonly>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-divider class="my-8"></v-divider>
      <v-col cols="12" md="6" class="my-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d163540.95034636674!2d121.3920916493341!3d25.08112733731736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a7bec9ad74b1%3A0xa639904a89f26435!2z5Yue5YuV6YOo5Yue5YuV5Yqb55m85bGV572y5YyX5Z-65a6c6Iqx6YeR6aas5YiG572y5rOw5bGx6IG35qWt6KiT57e05aC0!5e0!3m2!1szh-TW!2stw!4v1692578131925!5m2!1szh-TW!2stw"
          width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </v-col>
      <v-col cols="12" md="6" class="my-5 max-width-512">
        <h2 class="faq">Contact Us</h2>
        <v-form :disabled="isSubmitting" @submit.prevent="submit" id="myForm">
          <v-text-field label="Name" name="from_name" v-model="name.value.value"
            :error-messages="name.errorMessage.value"></v-text-field>
          <v-text-field label="Email" name="from_email" v-model="email.value.value"
            :error-messages="email.errorMessage.value"></v-text-field>
          <v-text-field label="Subject" name="subject" v-model="subject.value.value"
            :error-messages="subject.errorMessage.value"></v-text-field>
          <v-textarea label="Message" name="message" v-model="message.value.value"
            :error-messages="message.errorMessage.value"></v-textarea>
          <v-col col="12" class="d-flex justify-end">
            <v-btn variant="text" color="error" @click="handleReset" :loading="isSubmitting">Reset</v-btn>
            <v-btn variant="elevated" type="submit" color="primary" :loading="isSubmitting">Submit</v-btn></v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <Footer></Footer>
</template>

<script setup>
import validator from 'validator'
import * as yup from 'yup'
import emailjs from 'emailjs-com'
import { useForm, useField } from 'vee-validate'
import Footer from '@/components/footeR.vue'

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

const schema = yup.object({
  name: yup.string().required('Name is required').min(3, 'Name should have at least 3 characters'),
  email: yup.string().required('Email is required').test(
    'isEmail', 'Invalid email format', (value) => validator.isEmail(value)
  ),
  subject: yup.string().required('Subject is required').min(4, 'Subject should have at least 4 characters'),
  message: yup.string().required('Message is required').min(4, 'Message should have at least 4 characters')
})
const { handleSubmit, isSubmitting, resetForm, handleReset } = useForm({
  validationSchema: schema
})
const name = useField('name')
const email = useField('email')
const subject = useField('subject')
const message = useField('message')
const submit = handleSubmit(async (values) => {
  try {
    const templateParams = {
      to_email: 'arena702048@gmail.com',
      from_name: values.name,
      from_email: values.email,
      subject: values.subject,
      message: values.message
    }

    const response = await emailjs.send(
      'service_dgqnwlj',
      'template_l6ryww9',
      templateParams,
      'E9O3osL8tLn5HfqTG'
    )

    console.log('Email sent successfully:', response.text)
    resetForm()
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors)
    } else {
      console.error('Email sending error:', error.text)
    }
  }
})

</script>

<style lang="sass" scoped src="../../assets/pages/_aboutUs.sass">

</style>
