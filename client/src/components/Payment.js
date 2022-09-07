"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const axios_1 = __importDefault(require("axios"));
const Modal_1 = require("./Modal");
const react_1 = require("react");
const react_stripe_js_1 = require("@stripe/react-stripe-js");
const Payment = ({ totalPrice }) => {
    const stripe = (0, react_stripe_js_1.useStripe)();
    const elements = (0, react_stripe_js_1.useElements)();
    const [paymentFailed, setPaymentFailed] = (0, react_1.useState)(false);
    const [paymentLoading, setPaymentLoading] = (0, react_1.useState)(false);
    const [paymentSuccess, setPaymentSuccess] = (0, react_1.useState)(false);
    const confirmPayment = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setPaymentLoading(true);
        axios_1.default
            .post("/payment/create", {
            amount: totalPrice,
        })
            .then((data) => {
            return stripe === null || stripe === void 0 ? void 0 : stripe.confirmCardPayment(data.data.clientSecret, {
                payment_method: {
                    card: elements === null || elements === void 0 ? void 0 : elements.getElement(react_stripe_js_1.CardElement),
                },
            });
        })
            .then((result) => {
            if (result === null || result === void 0 ? void 0 : result.paymentIntent) {
                setPaymentSuccess(true);
                setPaymentLoading(false);
            }
            else {
                setPaymentFailed(true);
                setPaymentLoading(false);
            }
        })
            .catch((err) => {
            console.log(err);
            setPaymentLoading(false);
            setPaymentSuccess(false);
            setPaymentFailed(true);
        });
    });
    return (<div>
      {paymentLoading && <Modal_1.Modal status="loading"/>}
      {paymentSuccess && <Modal_1.Modal status="success"/>}
      {paymentFailed && <Modal_1.Modal status="error"/>}
      <div>
        <div className="paymentContainer">
          <react_stripe_js_1.CardElement options={{
            hidePostalCode: true,
            style: {
                base: {
                    iconColor: "#130f40",
                    color: "green",
                    fontSize: "1.1rem",
                },
            },
            iconStyle: "solid",
        }}/>
        </div>
        <button disabled={paymentLoading} onClick={confirmPayment} className="btn">
          Place Order
        </button>
      </div>
    </div>);
};
exports.Payment = Payment;
