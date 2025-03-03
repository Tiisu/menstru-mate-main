
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EducationCard from '@/components/EducationCard';

const Education = () => {
  const [activeTab, setActiveTab] = useState('basics');
  
  // Sample educational content
  const educationContent = {
    basics: [
      {
        title: 'Understanding Your Period',
        subtitle: 'The basics of the menstrual cycle and what to expect',
        content: `Your menstrual cycle is a natural process that your body goes through to prepare for potential pregnancy. Each month, your uterus grows a lining of tissue and blood vessels. If you don't become pregnant, this lining sheds—that's your period. A typical cycle lasts 28 days, but can range from 21 to 35 days. The first day of your period is considered day 1 of your cycle. Most periods last 3-7 days, with heavier flow at the beginning.`,
        category: 'Basics',
        readTime: '3 min read',
        imageUrl: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyaW9kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'Period Products 101',
        subtitle: 'Comparing different options for managing your period',
        content: `There are many options available for managing your period, including pads, tampons, menstrual cups, period underwear, and more. Pads are worn outside your body and attach to your underwear. Tampons and menstrual cups are worn inside your vagina. Period underwear absorbs blood directly. Each option has pros and cons, so it's about finding what works best for you. It's also perfectly fine to use different products at different times or on different days of your period.`,
        category: 'Products',
        readTime: '4 min read',
        imageUrl: 'https://images.unsplash.com/photo-1618355776464-8666794d2520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyaW9kJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
      },
    ],
    myths: [
      {
        title: 'Debunking Period Myths',
        subtitle: 'Separating fact from fiction about menstruation',
        content: `There are many myths about periods that have no scientific basis. For example, it's not true that you can't swim, exercise, or shower during your period. In fact, exercise can help reduce cramps! Another common myth is that your period "syncs up" with those around you—studies have found no evidence for this. It's also not true that having a period means you're "unclean" or should be isolated. These ideas stem from outdated cultural taboos, not medical facts.`,
        category: 'Myths',
        readTime: '5 min read',
        imageUrl: 'https://images.unsplash.com/photo-1526662092594-e98c1e356d6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXl0aHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'Period Pain: What\'s Normal?',
        subtitle: 'Understanding normal discomfort vs. concerning symptoms',
        content: `Some discomfort during your period is normal, but severe pain isn't. Mild to moderate cramping, breast tenderness, fatigue, and mood changes are common. However, if pain prevents you from daily activities, keeps you home from school/work, or isn't relieved by over-the-counter pain medications, talk to a healthcare provider. Conditions like endometriosis, PCOS, or fibroids can cause severe period pain and require medical attention. Remember, your experiences are valid, and you deserve support.`,
        category: 'Health',
        readTime: '4 min read',
        imageUrl: 'https://images.unsplash.com/photo-1616012480717-fd9e0ea54471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
      },
    ],
    wellness: [
      {
        title: 'Self-Care During Your Period',
        subtitle: 'Strategies to feel your best during menstruation',
        content: `Taking care of yourself during your period can make a big difference in how you feel. For cramps, try heat therapy (like a heating pad), gentle exercise, and over-the-counter pain relievers. Staying hydrated and reducing caffeine and salt can help with bloating. Getting enough sleep is crucial for managing mood changes and fatigue. Wearing comfortable clothing and taking time to rest when needed are simple but effective ways to practice self-care. Remember that your needs might change throughout your cycle, so pay attention to what your body is telling you.`,
        category: 'Wellness',
        readTime: '3 min read',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VsZiUyMGNhcmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'Nutrition and Your Cycle',
        subtitle: 'How food affects your hormones and period symptoms',
        content: `What you eat can significantly impact how you feel throughout your menstrual cycle. During your period, iron-rich foods (like spinach, lentils, and lean meats) can help replace iron lost through bleeding. Foods high in magnesium (like dark chocolate, bananas, and nuts) may help reduce cramping. Omega-3 fatty acids (found in fish, walnuts, and flaxseeds) can help reduce inflammation and pain. Staying hydrated and limiting foods that cause bloating (like salty snacks) can also help. Everyone's body responds differently to foods, so paying attention to what helps or worsens your symptoms can guide your personal nutrition choices.`,
        category: 'Nutrition',
        readTime: '5 min read',
        imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bnV0cml0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      },
    ]
  };

  return (
    <div className="pt-4 pb-20 px-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Learn About Your Body</h1>
      
      <Tabs defaultValue="basics" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="myths">Myths</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics" className="animate-fade-in">
          <div className="space-y-4">
            {educationContent.basics.map((article, index) => (
              <EducationCard
                key={index}
                title={article.title}
                subtitle={article.subtitle}
                content={article.content}
                category={article.category}
                readTime={article.readTime}
                imageUrl={article.imageUrl}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="myths" className="animate-fade-in">
          <div className="space-y-4">
            {educationContent.myths.map((article, index) => (
              <EducationCard
                key={index}
                title={article.title}
                subtitle={article.subtitle}
                content={article.content}
                category={article.category}
                readTime={article.readTime}
                imageUrl={article.imageUrl}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="wellness" className="animate-fade-in">
          <div className="space-y-4">
            {educationContent.wellness.map((article, index) => (
              <EducationCard
                key={index}
                title={article.title}
                subtitle={article.subtitle}
                content={article.content}
                category={article.category}
                readTime={article.readTime}
                imageUrl={article.imageUrl}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Education;
