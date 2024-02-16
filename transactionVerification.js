// Middleware Function
const verifyTransaction = (transaction) => {
  // Rule: Incorrect Pin attempts
  const isIncorrectPin = () => {
    const storedUserData = {
      pin: "1234",
    };
    return transaction.pin !== storedUserData.pin;
  };

  // Rule: Unusual IP Address
  const isUnusualIPAddress = () => {
    const usualIPs = {
      CityA: ["192.168.0.1", "192.168.0.3"],
      CityB: ["192.168.1.2"],
    };

    const cityIPs = usualIPs[transaction.location];
    return cityIPs && !cityIPs.includes(transaction.ip);
  };

  // Rule: High Transaction Amount
  const isHighTransactionAmount = () => {
    return transaction.amount > 1000;
  };

  // Rule: Unusual Merchant
  const isUnusualMerchant = () => {
    const usualMerchants = ["MerchantA", "MerchantB"];
    return !usualMerchants.includes(transaction.merchant);
  };

  // Apply Rules
  const rules = [
    isUnusualIPAddress,
    isHighTransactionAmount,
    isUnusualMerchant,
    isIncorrectPin,
    // isIncorrectMobile
  ];
  const isFraudulent = rules.some((rule) => rule());

  // User Verification
  if (isFraudulent) {
    handleUserVerification(transaction);
  }

  return isFraudulent ? 1 : 0;
};

// Function to Handle User Verification Based on Transaction Type
const handleUserVerification = (transaction) => {
  switch (transaction.transactionType) {
    case "e-commerce":
    case "web-checkout":
      verifyECommerceTransaction();
      break;
    case "POS-withdrawal":
      verifyPOSTransaction();
      break;
    case "ATM-withdrawal":
      verifyATMTransaction();
      break;
    default:
      break;
    // Add more cases for other transaction types as needed
  }
};

// Function to Perform User Verification for e-commerce and web checkout
const verifyECommerceTransaction = () => {
  // Implementation based on your requirements
  // For example, retrieve user's secret question and authenticator pin from the database
  // and compare it with the user's input
  // Return true if verification is successful, false otherwise
  const userVerificationResult = performUserVerification();
  if (!userVerificationResult) {
    restrictAccountFor24Hours();
  }
};

// Function to Perform POS Verification
const verifyPOSTransaction = () => {
  // Implementation based on your requirements
  // Mock user input for the last three middle missing digits of their mobile number
  const storedUserData = {
    mobileNumber: "123456890",
    pin: "1234",
  };

  // Retrieve user's mobile number and verify the last three digits (mocked)
  //   const storedUserData = {
  //     mobileNumber: "1234567890",
  //     pin: "1234"
  //   };

  const maxPinAttemps = 3;
  let pinAttempts = 0;

  const userInput = {
    pin: "1234",
  };

  while (pinAttempts < maxPinAttemps) {
    const userInputPin = prompt("Enter your Pin");

    if (userInputPin === storedUserData.pin) {
      sendOTPText(storedUserData.mobileNumber);
      // console.log(" Card locked due to three incorrect Pin attempts")
      // restrictAndLockCard();
      return;
    } else {
      pinAttempts++;
      console.log("Incorrect pin attempt");

      if (pinAttempts === maxPinAttemps) {
        console.log(" Card locked due to three incorrect Pin attempts");
        restrictAndLockCard();
        return;
      }
      alert(`Incorrect Pin, ${maxPinAttemps - pinAttempts} attempts remaining.`)
    }
  }
};

// Function to Perform ATM Verification
const verifyATMTransaction = (atmInput) => {
  // Implementation based on your requirements
  // Add logic to check if the user is on the last attempt
  const isLastAttempt = 3 === 3;

  if (isLastAttempt) {
    // Check if the user's image matches the one in the database (simplified comparison)
    const isImageMatched = "base64encodedimagedata";

    if (isImageMatched) {
      // Perform biometric scan (in real implementation)
      alert("Ask user to perform biometric scan for ATM transaction.");
    } else {
      // Restrict withdrawal and lock the card
      restrictWithdrawal("ATM");
    }
  }
};

// Function to Perform User Verification
const performUserVerification = () => {
  // Implementation based on your requirements
  // For example, retrieve user's secret question and authenticator pin from the database
  // and compare it with the user's input
  // Return true if verification is successful, false otherwise
};

// Function to Restrict Account for 24 Hours
const restrictAccountFor24Hours = () => {
  alert(
    `Account restricted for 24 hours due to potentially fraudulent activity.`
  );
  // Implement logic to restrict the account for 24 hours (e.g., update database)
};

// Function to Restrict and Lock Card
const restrictAndLockCard = () => {
  alert(
    `Card restricted and locked due to potentially fraudulent POS withdrawal.`
  );
  // Implement logic to restrict and lock the card (e.g., update database)
};

// Function to Send OTP as Text (mocked)
const sendOTPText = (mobileNumber) => {
  alert(`OTP sent as text to mobile number: ${mobileNumber}`);
  // Implement logic to send OTP as text (e.g., use a messaging service)
};

// Function to Check Image Match (simplified comparison)
const checkImageMatch = (userImage) => {
  // In real implementation, compare the user's image with the one in the database
  const storedImage = "base64encodedimagedata"; // Replace with actual image data
  return userImage === storedImage;
};

// Function to Restrict Withdrawal and Lock the Card
const restrictWithdrawal = (transactionType) => {
  alert(`Restricting withdrawal for ${transactionType} transaction.`);
  // Add logic to lock the card and restrict the account (in real implementation)
};

export { verifyTransaction };
