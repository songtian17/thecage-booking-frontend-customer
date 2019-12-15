<template>
  <div>
    <view-header :main="false">
      Account Settings
    </view-header>
      <form @submit.prevent="submitForm">
        <div class="form-section">
          <p class="section-title">Change Account Details</p>
          <div class="section-container">
            <label for="email">Email</label>
            <input v-model="formData.email" type="text" name="email" />
            <label for="name">Name</label>
            <input v-model="formData.name" type="text" name="name" />
            <label for="phone">Phone</label>
            <input v-model="formData.phone" type="text" name="phone" />
          </div>
        </div>
        <div class="form-section">
          <p class="section-title">Change Password</p>
          <div class="section-container">
            <label for="old-password">Old Password</label>
            <input v-model="formData.oldPassword" type="text" name="old-password" />
            <label for="new-password">New Password</label>
            <input v-model="formData.newPassword" type="text" name="new-password" />
            <label for="confirm-password">Confirm Password</label>
            <input v-model="formData.confirmPassword" type="text" name="confirm-password" />
          </div>
        </div>
        <input id="submit" type="submit" value="Save Changes" />
      </form>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader.vue';

export default {
  name: 'AccountSettings',
  data() {
    return {
      formData: {
        email: '',
        name: '',
        phone: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  components: {
    ViewHeader,
  },
  methods: {
    submitForm() {
      this.$axios.put(`${process.env.VUE_APP_API}/account`).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 80%;
  margin: 20px auto 40px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .form-section {
    margin-bottom: 20px;

    .section-container {
      border: 1px solid black;

      display: grid;
      grid-template-columns: 160px auto;
      grid-row-gap: 20px;
      padding: 20px 40px;

      input {
        border: 1px solid $secondary;
      }
    }
  }
}

.section-title {
  @include montserrat($h3, 600);
  margin: 10px 0;
}

#submit {
  background-color: $primary;
  color: white;
  padding: 6px 12px;
  //   border-radius: 4px;
  align-self: flex-end;
  float: right;
  @include montserrat($h4, 500);
  cursor: pointer;
}
</style>
