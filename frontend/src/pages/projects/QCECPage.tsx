import { ArrowLeft, Award, BookOpen, FileText, Calendar, MapPin, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import certificateImg from "@/assets/qcec-silver-certificate.jpg";
import Seo from "@/components/Seo";

const QCECPage = () => {
  return (
    <div className="min-h-screen bg-background">
  <Seo title={`River of Two Worlds — Essay`} description={`"River of Two Worlds" — Silver Award essay by Mirajul Islam (Mahim).`} />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20">
        <div className="container mx-auto px-4">
          <Link 
            to="/#achievements" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Achievements
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20 text-primary">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-primary font-medium">Silver Award</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              The Queen's Commonwealth Essay Competition 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              "River of Two Worlds": A short story exploring themes of cultural identity, 
              love, loss, and the universal connections that bind humanity together.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Royal Commonwealth Society</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Senior Category</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-primary" />
              Silver Award Certificate
            </h2>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border bg-card">
              <img 
                src={certificateImg} 
                alt="Queen's Commonwealth Essay Competition 2025 Silver Award Certificate for Mirajul Islam Mahim" 
                className="w-full h-auto"
              />
            </div>
            <p className="text-center text-muted-foreground mt-4 text-sm">
              Awarded by the Royal Commonwealth Society, signed by Sir Ben Okri OBE and Imtiaz Dharker
            </p>
          </motion.div>
        </div>
      </section>

      {/* Essay Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              The Essay
            </h2>
            <p className="text-muted-foreground mb-8">
              The complete text of "River of Two Worlds"
            </p>

            <article className="prose prose-lg dark:prose-invert max-w-none">
              <h1 className="text-3xl md:text-4xl font-serif text-center mb-12 text-foreground">
                River of Two Worlds
              </h1>

              <p>
                Zarin clutched the wooden box as she stepped onto the riverbank. The Thames glittered beneath the morning sunlight. She could almost imagine she was back in Bangladesh, standing by the Padma River, if not for the cold and the towering glass buildings of Canary Wharf in the distance.
              </p>

              <p>
                The box contained all she had left of Adnan: a collection of his poetry, the blue silk tie he wore at their engagement, and a small clay figurine of a boat, a reminder of the promise they had made to navigate life's rivers together. Now she would have to navigate them alone.
              </p>

              <p>
                Or perhaps not entirely alone. The old myth of Behula and Lakhindar had been whispering in her ear since the day Adnan collapsed in their East London flat, struck down by a mysterious illness that doctors struggled to diagnose. Within three weeks, he was gone, leaving Zarin marooned in a foreign land, cut adrift between cultures.
              </p>

              <p>
                "You came," called Maya, Zarin's British-Bangladeshi colleague from the library. "Are you sure about this?"
              </p>

              <p>
                Zarin nodded. "Behula traveled down the river with her husband's body to petition the gods. I have questions that need answers."
              </p>

              <p>
                Maya's expression softened with concern. "The Thames isn't the Padma, Zarin. And this isn't a folktale."
              </p>

              <p>
                "Every river connects to the sea eventually," Zarin replied, recalling her grandmother's words. "Just as all our stories connect, if you follow them far enough."
              </p>

              <p>
                Their journey began at Putney in a small motorboat Maya had arranged. Zarin had mapped stops where the waters of Bangladesh and Britain seemed to converge.
              </p>

              <p>
                At Battersea Park, Zarin opened the box and retrieved a cotton pouch of soil from her family's village near Padma.
              </p>

              <p>
                "My father sent this after Adnan died," she explained, sprinkling some into the Thames. "In our tradition, this connects the departed soul to both homes."
              </p>

              <p>
                Maya watched quietly, then said, "My grandparents came here in the 70s. They never went back, but my grandmother kept a jar of soil from their village until the day she died."
              </p>

              <p>
                "Did they ever feel at home here?" Zarin asked.
              </p>

              <p>
                "They built a home here," Maya corrected gently. "It's not the same thing."
              </p>

              <hr className="my-8" />

              <p>
                Downstream, the city transformed around them. Past Parliament and the London Eye, beneath historic bridges. Zarin thought of the snake god Manasa who had cursed Lakhindar. Adnan's "snake" had been an undetected heart condition, no less merciless, no less final.
              </p>

              <p>
                Near Tower Bridge, they encountered a grizzled old man fishing from a small dinghy, his dark skin weathered by decades on the water.
              </p>

              <p>
                "You ladies look like you're on a mission," he called out as they approached.
              </p>

              <p>
                "Something like that," Maya replied cautiously.
              </p>

              <p>
                "Name is Earl. Came here from Barbados in '62. Been fishing these waters for fifty years." He studied Zarin. "But you're newer to these shores, aren't you, love?"
              </p>

              <p>
                "Two years," Zarin admitted. "My husband and I came for our doctoral studies."
              </p>

              <p>
                Something in her tone must have revealed her loss, for Earl's expression shifted. "And now it's just you." Not a question.
              </p>

              <p>
                Zarin nodded.
              </p>

              <p>
                "Rivers hold memories," Earl said, casting his line again. "Back home, old folks say water carries our stories to those who've gone ahead." He reached into his tackle box and pulled out a small carved fish. "Here. Toss this in Greenwich. That's where the river opens up, best place to send a message."
              </p>

              <p>
                Zarin accepted the wooden fish, turning it over in her palm. "Thank you."
              </p>

              <p>
                As they pulled away, Earl called after them: "Remember, gal, river flows one way, but tide comes back. What you send out returns somehow."
              </p>

              <p>
                At Greenwich, where the river indeed seemed to expand toward the sea, they paused again. The Royal Observatory stood watch on the hill, marking the division between east and west, another boundary, another threshold.
              </p>

              <p>
                "In the original tale," Zarin explained as they drifted near the meridian line, "Behula's devotion was so pure that she eventually convinced the gods to restore her husband's life."
              </p>

              <p>
                "And what are you hoping for?" Maya asked gently.
              </p>

              <p>
                Zarin opened the box again, this time removing Adnan's poems. "Not resurrection. Just resolution."
              </p>

              <p>
                She had been translating his Bengali poetry into English, building a bridge between the literary traditions he had loved. One poem in particular had haunted her since his death, about a river that flows through dreams, connecting all who have ever loved across time and space.
              </p>

              <blockquote className="border-l-4 border-primary pl-6 italic my-8">
                "He always said stories were our true homeland," Zarin murmured, reading from his words. "More permanent than nations, more welcoming than cities."
              </blockquote>

              <p>
                As she read the poem aloud, first in Bengali, then her English translation, a small crowd gathered on the nearby embankment. An elderly Sikh gentleman nodded appreciatively. A young Black British mother hushed her curious child. A group of Eastern European construction workers paused their lunch. The words seemed to hover over the water, creating a momentary community of listeners.
              </p>

              <p>
                When she finished, the elderly Sikh man approached. "My wife loved poetry," he said. "She's been gone for three years now. Sometimes I read her favorites by the water too."
              </p>

              <p>
                "Does it help?" Zarin asked.
              </p>

              <p>
                "It reminds me that loss is universal," he replied. "And so is love."
              </p>

              <hr className="my-8" />

              <p>
                Their final stop was the Thames Barrier, that massive engineering marvel designed to protect London from flooding. Zarin thought it fitting: barriers and boundaries had defined her experience since Adnan's death. Cultural barriers. The boundary between life and death. The invisible lines between belonging and exile.
              </p>

              <p>
                "In Bangladesh, rivers can destroy entire villages," she told Maya as they gazed at the silvery structures rising from the water. "But they also bring new soil, new life."
              </p>

              <p>
                "Sounds like London," Maya mused. "Constantly destroying and rebuilding itself."
              </p>

              <p>
                As the afternoon light began to fade, Zarin finally opened the last compartment of her wooden box. Inside lay a small clay urn containing some of Adnan's ashes, the portion his parents had agreed she could keep.
              </p>

              <p>
                "In the original tale, Behula performed miracles to bring Lakhindar back," Zarin said. "I've accepted that I can't have that miracle. But perhaps there are others."
              </p>

              <p>
                She had been offered a permanent position at the British Library, cataloging and translating Bengali literary works, creating pathways for others to cross between cultures. The job would let her build a life here while honoring her origins and Adnan's memory.
              </p>

              <p>
                "What will you do?" Maya asked as Zarin held the small urn.
              </p>

              <p>
                "I'll keep a portion, as his parents kept a portion. And I'll release some here, where the river meets the sea—neither fully England nor fully elsewhere." She paused. "Behula eventually returned home with her restored husband. My journey will be different."
              </p>

              <p>
                "What would Adnan want?" Maya asked softly.
              </p>

              <p>
                Zarin smiled for perhaps the first time that day. "He would say that stories never end, they just flow into other stories." She opened the urn and let some of the ashes drift onto the water's surface. "Like rivers to the sea."
              </p>

              <hr className="my-8" />

              <h2 className="text-2xl font-serif text-center my-8">
                River Tales: Narrative Currents from Bangladesh to Britain
              </h2>

              <p>
                Six months later, Zarin stood in the British Library auditorium, addressing a diverse audience gathered for the opening of a new exhibition.
              </p>

              <p>
                Earl was there, as was the Sikh gentleman from Greenwich. Maya sat in the front row, beaming with pride at what her friend had accomplished. The exhibition featured Adnan's poetry alongside works by British-Bangladeshi authors, traditional tales alongside contemporary interpretations.
              </p>

              <p>
                At the center stood a glass case containing Zarin's wooden box, now empty of Adnan's possessions but filled with handwritten notes from people who had heard her story and been moved to share their own. Tales of love and loss, of journeys between cultures, of finding home in stories when physical homes were lost.
              </p>

              <p>
                "The tale of Behula and Lakhindar has been told for centuries in Bangladesh," Zarin explained to the audience. "It's a story about devotion so powerful it can challenge death itself. But it's also about the journey, about carrying what we love through hostile waters, about finding allies in unexpected places."
              </p>

              <p>
                She gestured to the diverse faces before her. "Like Behula, I set out on these waters carrying grief. What I found was that rivers don't just connect places, they connect people. And stories don't just connect the past to the present, they connect us to each other."
              </p>

              <p>
                Outside, the Thames continued its ancient journey toward the sea, carrying the city's stories with it—some as old as London itself, others as new as yesterday's arrivals. And somewhere in its currents flowed the memory of a young Bangladeshi poet and his wife, who like Behula before her, had transformed her impossible journey into a new kind of miracle.
              </p>

              <p>
                "In the end," Zarin concluded, "Behula's true power wasn't that she defeated death. It was that she refused to accept that love could be stopped by any boundary. Not rivers, not gods, not even death itself." She smiled at her audience. "Some might call that a fairy tale. I call it the most practical wisdom I know."
              </p>
            </article>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QCECPage;

