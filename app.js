const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test_k')
.then(() => console.log('Connected success...'))
.catch(err => console.log(err));
const blogSchema = new mongoose.Schema({
    title:  {
    type : String,
    required: true, //validaion things
    minlength: 3,
    maxlength: 255,
    trim: true,
    unique: true,

    },
    author:{
        type: String,
        validate:{ 
            validator: function(value){ // custom validation
                return value.length > 2;
            },
            message:"author name must be longer than 2 characters"
        }
    },
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now }
  });

  // collection creation
  const Blog = mongoose.model('Blog', blogSchema);
const createDocument = async () => {
    try {
        const kbsblog = new Blog({
            title: 'My fifth blog',
            author: 'KB',
            body: 'This is my fifth blog',
            comments: [{ body: 'Bad post!', date: new Date() }]
            })
            const bblog = new Blog({
                title: 'My six Blog',
                author: 'KBS',
                body: 'This is my six blog',
                comments: [{ body: 'Bad post!', date: new Date() }]
                })
       const result = await Blog.insertMany([kbsblog,bblog]);
       console.log(result);
        } catch (error) {
            console.log(error);
        }   
}
createDocument();

// reading - get document
const getDocument = async function() {
    try {
        const result = await Blog.find({});
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
//getDocument();
