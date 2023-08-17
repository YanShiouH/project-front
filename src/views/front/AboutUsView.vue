<template>
  <v-container>
    <v-row>
      <!-- About Us Information -->
      <v-col cols="12" class="text-center">
        <h1>About Us</h1>
        <p>Welcome to Taealam, your gateway to learning Arabic!</p>
        <p>We are a passionate group of language enthusiasts dedicated to helping you explore the beauty of the Arabic
          language and culture.</p>
      </v-col>

      <!-- FAQ Section -->
      <v-col cols="12">
        <h2>Frequently Asked Questions</h2>
        <v-accordion>
          <!-- FAQ Item 1 -->
          <v-accordion-item>
            <v-accordion-header>
              What courses do you offer?
            </v-accordion-header>
            <v-accordion-content>
              We offer a range of Arabic language courses designed for learners of all levels, from beginners to advanced.
            </v-accordion-content>
          </v-accordion-item>
          <!-- Add more FAQ items here -->
        </v-accordion>
      </v-col>

      <!-- Contact Form -->
      <v-col cols="12">
        <h2>Contact Us</h2>
        <v-form @submit.prevent="submitForm" id="myForm">
          <v-text-field label="name" v-model="contactForm.name" required></v-text-field>
          <v-text-field label="email" v-model="contactForm.email" required></v-text-field>
          <v-text-field label="subject" v-model="contactForm.subject" required></v-text-field>
          <v-textarea label="message" v-model="contactForm.message" required></v-textarea>
          <v-col col="12" class="d-flex justify-end">
            <v-btn variant="text" type="reset" color="error" @click="resetForm">Reset</v-btn>
            <v-btn variant="text" type="submit" color="primary">Submit</v-btn></v-col>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import emailjs from 'emailjs-com' // Import the emailjs library
const form = document.querySelector('#myForm')
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

    // Optionally reset the form after successful submission
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
