# 🚀 QUICK TOPIC ADDITION GUIDE

## To Add a New Topic:

1. **Copy the template:**
   ```bash
   cp templates/topic-template.html topics/[category]/[new-topic-name].html
   ```

2. **Edit the new file** with your content

3. **Add to topics.json:**
   ```json
   {
       "id": "unique-id-here",
       "title": "Your Topic Title",
       "category": "politics|science|technology|culture|health|finance",
       "description": "Brief compelling description",
       "date": "YYYY-MM-DD",
       "views": 0,
       "readTime": "X min",
       "file": "topics/[category]/[filename].html"
   }
   ```

4. **Open the hub** to see your new topic!

## Category Icons:
- 🏛️ Politics
- 🧬 Science  
- 💻 Technology
- 🎭 Culture
- 💊 Health
- 💰 Finance

## Color Classes for Cards:
- `.tax-card` - Blue (#00d4ff)
- `.program-card` - Purple (#ff00ff)
- `.cut-card` - Red (#ff6b6b)
- `.other-card` - Teal (#4ecdc4)

## Remember:
- Use `<span class="highlight">text</span>` for key numbers/facts
- Keep descriptions engaging and clear
- Test on mobile!
- Update the date in topics.json

Happy Mind Blowing! 🎉