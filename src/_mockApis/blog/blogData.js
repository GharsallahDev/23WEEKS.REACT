import mock from '../mock';
import { Chance } from 'chance';
import { random } from 'lodash';
import { sub } from 'date-fns';
import s1 from 'src/assets/images/blog/blog-img1.jpg';
import s2 from 'src/assets/images/blog/blog-img2.jpg';
import s3 from 'src/assets/images/blog/blog-img3.jpg';
import s4 from 'src/assets/images/blog/blog-img4.jpg';
import s5 from 'src/assets/images/blog/blog-img5.jpg';
import s6 from 'src/assets/images/blog/blog-img6.jpg';
import s7 from 'src/assets/images/blog/blog-img11.jpg';
import s8 from 'src/assets/images/blog/blog-img8.jpg';
import s9 from 'src/assets/images/blog/blog-img9.jpg';
import s10 from 'src/assets/images/blog/blog-img10.jpg';

import { uniqueId } from 'lodash';

const chance = new Chance();

const BlogComment = [
  {
    id: uniqueId('#comm_'),
    time: chance.date(),
    comment: chance.paragraph({ sentences: 2 }),
    replies: [],
  },
  {
    id: uniqueId('#comm_'),
    profile: {
      id: chance.integer({ min: 1, max: 2000 }),
      name: chance.name(),
    },
    time: chance.date(),
    comment: chance.paragraph({ sentences: 2 }),
    replies: [
      {
        id: uniqueId('#comm_'),
        profile: {
          id: chance.integer({ min: 1, max: 2000 }),
          name: chance.name(),
        },
        time: chance.date(),
        comment: chance.paragraph({ sentences: 2 }),
      },
    ],
  },
  {
    id: uniqueId('#comm_'),
    profile: {
      id: chance.integer({ min: 1, max: 2000 }),
      name: chance.name(),
    },
    time: chance.date(),
    comment: chance.paragraph({ sentences: 2 }),
    replies: [],
  },
];

const BlogPost = [
  {
    id: chance.integer({ min: 1, max: 2000 }),
    title: 'Understanding Your First Trimester: What to Expect',
    content: 'The first trimester of pregnancy is a time of significant change and adaptation, both physically and emotionally. During these early weeks, your body undergoes various transformations to support the growing embryo, which eventually becomes a fetus. Hormonal shifts may cause symptoms like nausea, fatigue, and mood swings. It’s crucial to establish a strong foundation for your pregnancy by focusing on a healthy diet, prenatal vitamins, and regular medical check-ups. Understanding the changes happening in your body can help alleviate anxiety and allow you to take proactive steps in managing your well-being.',
    coverImg: s1,
    createdAt: sub(new Date(), { days: 2, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    featured: false,
    comments: BlogComment,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    title: 'Essential Prenatal Vitamins for a Healthy Pregnancy',
    content: 'Prenatal vitamins play a critical role in ensuring the health of both mother and baby during pregnancy. These supplements are specifically designed to meet the increased nutritional needs of pregnant women, providing essential vitamins and minerals like folic acid, iron, calcium, and DHA. Folic acid is particularly important in the first trimester as it helps prevent neural tube defects. Iron supports the increased blood volume and oxygen supply, while calcium aids in the development of the baby’s bones and teeth. DHA, an omega-3 fatty acid, is vital for brain development. Incorporating prenatal vitamins into your daily routine can help bridge any nutritional gaps and support a healthy pregnancy.',
    coverImg: s2,
    createdAt: sub(new Date(), { days: 1, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    featured: false,
    comments: BlogComment,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    title: 'How to Create a Birth Plan: A Step-by-Step Guide',
    content: 'Creating a birth plan is an important step in preparing for childbirth, as it allows you to communicate your preferences and expectations to your healthcare team. A birth plan typically includes details such as your preferred delivery method, pain management options, and who you want present during labor. It may also cover your preferences for interventions like episiotomies, fetal monitoring, and the use of forceps or vacuum extraction. Additionally, you can specify your wishes for the immediate postpartum period, such as skin-to-skin contact and breastfeeding. While it’s important to remember that childbirth can be unpredictable, having a birth plan can help you feel more prepared and in control of your birthing experience.',
    coverImg: s3,
    createdAt: sub(new Date(), { days: 15, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    featured: false,
    comments: BlogComment,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    title: 'Managing Morning Sickness: Tips and Remedies',
    content: 'Morning sickness, characterized by nausea and vomiting, is a common symptom experienced by many pregnant women, particularly in the first trimester. While the exact cause is not fully understood, it is believed to be related to the rapid hormonal changes occurring in the body. To manage morning sickness, try eating small, frequent meals throughout the day and avoiding foods that trigger nausea. Ginger and peppermint are known for their soothing effects on the stomach and can be consumed as tea or in supplement form. Staying hydrated is also important, so sip on water or electrolyte drinks throughout the day. If morning sickness is severe and affects your ability to eat or drink, consult your healthcare provider for additional support.',
    coverImg: s4,
    createdAt: sub(new Date(), { days: 30, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    featured: false,
    comments: BlogComment,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    title: 'What to Pack in Your Hospital Bag: A Checklist',
    content: 'Packing your hospital bag ahead of time can help reduce stress as you approach your due date. It’s a good idea to have your bag ready by the time you reach 36 weeks of pregnancy. Essentials to include are comfortable clothing, toiletries, and any medications you may need. Don’t forget items for the baby, such as newborn outfits, diapers, and a car seat for the ride home. Consider packing snacks, a phone charger, and any items that will make your stay more comfortable, such as a pillow or blanket from home. Having everything prepared will allow you to focus on the experience of welcoming your new baby rather than worrying about what you might have forgotten.',
    coverImg: s5,
    createdAt: sub(new Date(), { days: 12, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    featured: false,
    comments: BlogComment,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    title: 'Preparing for Labor: Exercises and Techniques',
    content: 'Preparing for labor involves not only understanding the process but also strengthening your body and mind to handle the physical demands of childbirth. Prenatal exercises, such as pelvic tilts, squats, and Kegel exercises, can help tone the muscles used during labor and improve flexibility. Breathing techniques, like those taught in Lamaze classes, can help you manage pain and stay focused during contractions. Visualization and relaxation techniques, including meditation and progressive muscle relaxation, can also be valuable tools in managing the emotional and physical stress of labor. The more you prepare, the more confident and empowered you’ll feel when the time comes to deliver your baby.',
    coverImg: s6,
    createdAt: sub(new Date(), { days: 6, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    featured: false,
    comments: BlogComment,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    title: 'Nutrition Tips for a Balanced Pregnancy Diet',
    content: 'Maintaining a balanced diet during pregnancy is essential for the health of both mother and baby. A diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats provides the necessary nutrients to support fetal development and maternal well-being. It’s important to focus on key nutrients like folate, iron, calcium, and omega-3 fatty acids. Folate helps prevent birth defects, iron supports increased blood volume, calcium strengthens bones and teeth, and omega-3s contribute to brain development. Avoiding certain foods, such as raw or undercooked meat, fish high in mercury, and unpasteurized dairy products, is also crucial to minimize the risk of foodborne illnesses. Staying hydrated and incorporating a variety of nutrient-dense foods into your diet will help ensure a healthy pregnancy.',
    coverImg: s7,
    createdAt: sub(new Date(), { days: 5, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    featured: false,
    comments: BlogComment,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    title: 'The Importance of Prenatal Care: What to Discuss with Your Doctor',
    content: 'Regular prenatal care is vital for monitoring the health of both mother and baby throughout pregnancy. Prenatal visits allow your healthcare provider to track your baby’s growth, perform necessary tests, and address any concerns you may have. During these visits, you’ll discuss important topics such as nutrition, exercise, and any symptoms you’re experiencing. It’s also a time to ask questions and gain valuable information on what to expect in the coming months. Prenatal care visits typically include checking your blood pressure, weight, and measuring your belly to monitor the baby’s growth. Ultrasounds may be performed to check the baby’s development and position. By staying informed and engaged in your prenatal care, you can help ensure a healthy pregnancy and delivery.',
    coverImg: s8,
    createdAt: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    featured: false,
    comments: BlogComment,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    title: 'Mental Wellness During Pregnancy: Stress Management Strategies',
    content: 'Pregnancy is a time of significant emotional and physical change, which can sometimes lead to increased stress and anxiety. It’s important to prioritize your mental wellness during this period to ensure a healthy pregnancy. Strategies for managing stress include practicing mindfulness, engaging in regular physical activity, and maintaining a strong support network. Mindfulness practices, such as meditation and deep breathing exercises, can help you stay present and reduce anxiety. Regular physical activity, like walking or prenatal yoga, can improve mood and reduce stress. It’s also important to communicate openly with your partner, friends, and healthcare provider about your feelings and concerns. Taking time for self-care and seeking professional support if needed can help you navigate the emotional ups and downs of pregnancy.',
    coverImg: s9,
    createdAt: sub(new Date(), { days: 10, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    featured: false,
    comments: BlogComment,
  },
  {
    id: chance.integer({ min: 1, max: 2000 }),
    title: 'Baby’s Developmental Milestones in the Womb: A Month-by-Month Guide',
    content: 'Understanding your baby’s developmental milestones during pregnancy can help you feel more connected and informed as your pregnancy progresses. In the first trimester, the embryo’s heart begins to beat, and major organs start to form. By the second trimester, the fetus can hear sounds, and movements become more noticeable as the baby grows. The third trimester is a time of rapid growth and development, as the baby gains weight and prepares for birth. Key milestones to look forward to include the first ultrasound, feeling the baby kick, and hearing the heartbeat. Each month brings new developments, making it an exciting time for expecting parents. Tracking these milestones can enhance your bond with your baby and provide reassurance that everything is progressing as it should.',
    coverImg: s10,
    createdAt: sub(new Date(), { days: 3, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    featured: false,
    comments: BlogComment,
  },
];

export default BlogPost;

mock.onGet('/api/data/blog/BlogPosts').reply(() => {
  return [200, BlogPost];
});

mock.onGet(/\/api\/data\/blog\/post\/\d+/).reply((config) => {
  const id = parseInt(config.url.split('/').pop());
  const post = BlogPost.find((_post) => _post.id === id);

  if (!post) {
    return [404, { message: 'Post not found' }];
  }

  return [200, { post }];
});

mock.onPost('/api/data/blog/post/add').reply((config) => {
  try {
    const { postId, comment } = JSON.parse(config.data);
    const postIndex = BlogPost.findIndex((x) => x.id === postId);
    const post = BlogPost[postIndex];
    const cComments = post.comments || [];
    post.comments = [comment, ...cComments];
    return [200, { posts: [...BlogPost] }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});