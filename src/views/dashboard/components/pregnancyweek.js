const pregnancyWeeksData = {
    1: {
      title: "Week 1: Conception",
      description: "During week 1, conception takes place. The journey begins!",
      babyDevelopment: "Your baby is just a group of cells dividing rapidly.",
      tips: "Stay hydrated, eat healthily, and start taking prenatal vitamins.",
      nutrition: "Focus on a balanced diet rich in vitamins and minerals, especially folic acid.",
    },
    2: {
      title: "Week 2: Implantation",
      description: "The fertilized egg implants in the uterus.",
      babyDevelopment: "Your baby is still a tiny group of cells, but they're starting to grow.",
      tips: "Continue your healthy diet and avoid smoking or alcohol.",
      nutrition: "Increase your intake of leafy greens and whole grains for essential nutrients.",
    },
    3: {
      title: "Week 3: The Embryo",
      description: "The fertilized egg is now an embryo, and it starts its growth in the uterus.",
      babyDevelopment: "The embryo is about the size of a pinhead and continues to divide rapidly.",
      tips: "Avoid harmful substances and ensure you're eating well to support your pregnancy.",
      nutrition: "Consider incorporating sources of protein such as beans, lentils, and fish.",
    },
    4: {
      title: "Week 4: Positive Test",
      description: "This is typically the week when you can confirm pregnancy with a test.",
      babyDevelopment: "Your baby is forming a neural tube, which will later develop into the brain and spine.",
      tips: "Schedule your first prenatal appointment and start a regular exercise routine if you haven't already.",
      nutrition: "Focus on getting enough calcium from dairy or fortified alternatives for healthy bone development.",
    },
    5: {
      title: "Week 5: Early Development",
      description: "Your baby is growing quickly, and the neural tube is forming.",
      babyDevelopment: "The heart and circulatory system are starting to develop.",
      tips: "Get plenty of rest and eat nutrient-dense foods to support your baby's development.",
      nutrition: "Include iron-rich foods like spinach, red meat, and beans to support increased blood volume.",
    },
    6: {
      title: "Week 6: Heartbeat",
      description: "By this week, your baby's heart is beating for the first time.",
      babyDevelopment: "Your baby is about the size of a pea, and facial features are starting to form.",
      tips: "Keep taking your prenatal vitamins and consider gentle exercises like walking or yoga.",
      nutrition: "Eat foods rich in omega-3 fatty acids, like salmon or walnuts, for brain development.",
    },
    7: {
      title: "Week 7: Rapid Growth",
      description: "Your baby is growing rapidly, and limb buds are starting to appear.",
      babyDevelopment: "The brain and other major organs are developing quickly.",
      tips: "Be sure to manage your stress and get plenty of sleep to support your own health.",
      nutrition: "Focus on hydration; drink plenty of water and consider herbal teas for added comfort.",
    },
    8: {
      title: "Week 8: Major Organs Form",
      description: "Your baby's major organs, including the lungs, heart, and brain, are continuing to develop.",
      babyDevelopment: "The baby is about the size of a kidney bean and has tiny fingers and toes.",
      tips: "Ensure you're eating a balanced diet, rich in fruits, vegetables, and whole grains.",
      nutrition: "Consume a variety of colorful fruits and vegetables to provide antioxidants.",
    },
    9: {
      title: "Week 9: Fetal Stage",
      description: "Your baby graduates from an embryo to a fetus.",
      babyDevelopment: "The fetus is developing muscles and nerves, and can now move slightly.",
      tips: "Continue to avoid harmful substances and stay active to keep your energy up.",
      nutrition: "Consider foods rich in vitamin D, like fortified milk and sunlight exposure, for healthy bones.",
    },
    10: {
      title: "Week 10: Growing Strong",
      description: "Your baby’s bones are starting to harden and organs are maturing.",
      babyDevelopment: "The fetus is about the size of a strawberry, with all major organ systems in place.",
      tips: "Start considering any lifestyle changes you might need to prepare for the baby’s arrival.",
      nutrition: "Focus on protein intake to support the baby's growth; lean meats, dairy, and nuts are good choices.",
    },
    // Add more weeks up to 40
    11: {
      title: "Week 11: Development Continues",
      description: "Your baby is growing rapidly, and all major organs are formed.",
      babyDevelopment: "The fetus is about the size of a lime and is starting to move.",
      tips: "Stay active, but listen to your body and rest when needed.",
      nutrition: "Increase your intake of folate-rich foods like citrus fruits and beans to support neural development.",
    },
    12: {
      title: "Week 12: First Trimester Ends",
      description: "You are approaching the end of the first trimester.",
      babyDevelopment: "The fetus is developing fingerprints and can open and close its hands.",
      tips: "Plan for your upcoming prenatal appointments.",
      nutrition: "Focus on hydration; consider smoothies and soups to stay hydrated and nourished.",
    },
    13: {
      title: "Week 13: Entering Second Trimester",
      description: "Congratulations, you are now in the second trimester!",
      babyDevelopment: "Your baby is about the size of a peach, and many organs are now functioning.",
      tips: "Enjoy this period, as many women feel more energetic.",
      nutrition: "Include a variety of whole grains for sustained energy and fiber.",
    },
    14: {
        title: "Week 14: Baby's Growth",
        description: "Your baby is now the size of a lemon.",
        babyDevelopment: "The baby's facial features are becoming more distinct.",
        tips: "Stay active and consider light exercises.",
        nutrition: "Focus on calcium-rich foods like yogurt and cheese.",
      },
      15: {
        title: "Week 15: Developing Senses",
        description: "Your baby is now the size of an apple.",
        babyDevelopment: "The baby’s skin is developing and is becoming less transparent.",
        tips: "Stay hydrated and continue your prenatal vitamins.",
        nutrition: "Include more iron-rich foods like spinach.",
      },
      16: {
        title: "Week 16: Physical Changes",
        description: "Your baby is now the size of an avocado.",
        babyDevelopment: "The baby is starting to move, and you might feel flutters.",
        tips: "Take time for self-care and relaxation.",
        nutrition: "Eat foods rich in omega-3 fatty acids like fish.",
      },
      17: {
        title: "Week 17: Hearing Sounds",
        description: "Your baby is now the size of a turnip.",
        babyDevelopment: "The baby can hear external sounds.",
        tips: "Talk or sing to your baby to encourage bonding.",
        nutrition: "Keep your diet balanced and varied.",
      },
      18: {
        title: "Week 18: Baby's Movement",
        description: "Your baby is now the size of a bell pepper.",
        babyDevelopment: "The baby is moving more frequently.",
        tips: "Consider keeping a pregnancy journal.",
        nutrition: "Stay hydrated and monitor your salt intake.",
      },
      19: {
        title: "Week 19: Active Baby",
        description: "Your baby is now the size of a mango.",
        babyDevelopment: "Your baby is becoming increasingly active.",
        tips: "Consider prenatal classes for additional support.",
        nutrition: "Incorporate more fiber into your meals.",
      },
      20: {
        title: "Week 20: Halfway There",
        description: "Your baby is now the size of a banana.",
        babyDevelopment: "You're halfway through your pregnancy!",
        tips: "Take this time to bond with your baby.",
        nutrition: "Eat foods rich in vitamin C, like oranges.",
      },
      21: {
        title: "Week 21: Baby's Digestive System",
        description: "Your baby is now the size of a carrot.",
        babyDevelopment: "The baby’s digestive system is developing.",
        tips: "Stay active but listen to your body.",
        nutrition: "Consume whole grains for energy.",
      },
      22: {
        title: "Week 22: Skin Development",
        description: "Your baby is now the size of a spaghetti squash.",
        babyDevelopment: "The baby's skin is developing fat layers.",
        tips: "Focus on your mental well-being.",
        nutrition: "Add healthy fats to your diet, such as avocados.",
      },
      23: {
        title: "Week 23: Baby's Activity",
        description: "Your baby is now the size of a grapefruit.",
        babyDevelopment: "The baby is more active and responsive.",
        tips: "Take breaks when needed and relax.",
        nutrition: "Consider calcium supplements if necessary.",
      },
      24: {
        title: "Week 24: Developing Lungs",
        description: "Your baby is now the size of an ear of corn.",
        babyDevelopment: "The baby’s lungs are developing.",
        tips: "Start preparing for the baby shower.",
        nutrition: "Maintain a balanced diet with various foods.",
      },
      25: {
        title: "Week 25: Rapid Growth",
        description: "Your baby is now the size of a cauliflower.",
        babyDevelopment: "The baby is gaining weight quickly.",
        tips: "Stay active with light exercises.",
        nutrition: "Focus on hydration and electrolyte balance.",
      },
      26: {
        title: "Week 26: Recognizing Voices",
        description: "Your baby is now the size of a head of lettuce.",
        babyDevelopment: "The baby can recognize your voice.",
        tips: "Listen to calming music together.",
        nutrition: "Include antioxidant-rich foods like berries.",
      },
      27: {
        title: "Week 27: Fat Storage",
        description: "Your baby is now the size of a rutabaga.",
        babyDevelopment: "The baby is beginning to store fat.",
        tips: "Practice relaxation techniques for stress relief.",
        nutrition: "Ensure adequate vitamin D intake through diet or sunlight.",
      },
      28: {
        title: "Week 28: Developing Sleep Cycle",
        description: "Your baby is now the size of an eggplant.",
        babyDevelopment: "The baby is developing a sleep cycle.",
        tips: "Create a calm environment for relaxation.",
        nutrition: "Incorporate iron-rich foods to prevent anemia.",
      },
      29: {
        title: "Week 29: Immune System",
        description: "Your baby is now the size of a butternut squash.",
        babyDevelopment: "The baby is developing a stronger immune system.",
        tips: "Start discussing your birth plans.",
        nutrition: "Focus on high-protein and calcium-rich foods.",
      },
      30: {
        title: "Week 30: Preparing for Birth",
        description: "Your baby is now the size of a cabbage.",
        babyDevelopment: "The baby is gaining weight rapidly and preparing for birth.",
        tips: "Stay prepared and relaxed as the big day approaches.",
        nutrition: "Eat plenty of fruits and vegetables for essential vitamins.",
      },
      31: {
        title: "Week 31: Baby's Growth",
        description: "Your baby is now the size of a pineapple.",
        babyDevelopment: "The baby continues to gain weight and strength.",
        tips: "Consider practicing breathing exercises.",
        nutrition: "Include more fiber in your diet to ease any discomfort.",
      },
      32: {
        title: "Week 32: Bonding Time",
        description: "Your baby is now the size of a squash.",
        babyDevelopment: "The baby is becoming more active and responsive.",
        tips: "Spend time bonding with your baby through gentle touches.",
        nutrition: "Focus on staying hydrated and eating balanced meals.",
      },
      33: {
        title: "Week 33: Organ Development",
        description: "Your baby is now the size of a cantaloupe.",
        babyDevelopment: "The baby's organs are almost fully developed.",
        tips: "Prepare your hospital bag and essentials for the birth.",
        nutrition: "Include foods rich in iron and calcium.",
      },
      34: {
        title: "Week 34: Practice Breathing",
        description: "Your baby is now the size of a honeydew melon.",
        babyDevelopment: "The baby is practicing breathing movements.",
        tips: "Consider taking a childbirth education class.",
        nutrition: "Eat small, frequent meals to manage heartburn.",
      },
      35: {
        title: "Week 35: Positioning",
        description: "Your baby is now the size of a coconut.",
        babyDevelopment: "The baby may start to move into a head-down position.",
        tips: "Discuss your birthing plan with your healthcare provider.",
        nutrition: "Maintain a healthy diet and focus on whole foods.",
      },
      36: {
        title: "Week 36: Preparing for Delivery",
        description: "Your baby is now the size of a large cantaloupe.",
        babyDevelopment: "The baby is preparing for delivery and gaining weight.",
        tips: "Stay active and practice positions that may help during labor.",
        nutrition: "Eat well-balanced meals and stay hydrated.",
      },
      37: {
        title: "Week 37: Full Term",
        description: "Your baby is now considered full term.",
        babyDevelopment: "Your baby is fully developed and ready for birth.",
        tips: "Prepare your home for the baby's arrival.",
        nutrition: "Focus on nutritious meals to keep your energy up.",
      },
      38: {
        title: "Week 38: Final Touches",
        description: "Your baby is now the size of a watermelon.",
        babyDevelopment: "The baby is gaining weight and preparing for life outside.",
        tips: "Stay calm and relaxed as the due date approaches.",
        nutrition: "Continue eating a balanced diet for energy.",
      },
      39: {
        title: "Week 39: Almost There",
        description: "Your baby is ready to be born!",
        babyDevelopment: "The baby is fully developed and ready for the outside world.",
        tips: "Stay in touch with your healthcare provider for updates.",
        nutrition: "Keep eating small, nutritious meals and stay hydrated.",
      },
    40: {
      title: "Week 40: Delivery",
      description: "Your baby is ready to be born!",
      babyDevelopment: "Your baby is fully developed and ready for the outside world.",
      tips: "Prepare for labor and ensure you have all necessary items for the baby.",
      nutrition: "Stay hydrated and keep eating small, nutritious meals to maintain your energy during labor.",
    },
  };
  
  export default pregnancyWeeksData;
  