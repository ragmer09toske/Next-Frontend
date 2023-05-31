import axios from 'axios';
import { ConsumerKey } from '@env'
import { ConsumerSecret } from '@env'
import { Jaden } from '@env'

const timestamp = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
const timestampStr = timestamp.toLocaleString('en-US', options);
const timeStampt = timestampStr;

const TransactionType = "puy marchent"

const axiosInstance = axios.create({
  baseURL: apiUrl,
  auth: {
    username: ConsumerKey,
    password: ConsumerSecret
  }
});

// Make payment request
axiosInstance.post('/mpesa/stkpush/v1/processrequest', {
  BusinessShortCode: 'YOUR_BUSINESS_SHORTCODE',
  Password: Jaden,
  Timestamp: timeStampt,
  TransactionType: TransactionType,
  Amount: '1',
  PartyA: 59749725,
  PartyB: 5221,
  PhoneNumber: 'YOUR_PHONE_NUMBER',
  CallBackURL: 'YOUR_CALLBACK_URL',
  AccountReference: 'YOUR_ACCOUNT_REFERENCE',
  TransactionDesc: 'YOUR_TRANSACTION_DESCRIPTION'
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});