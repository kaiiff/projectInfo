const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);

const BlogModelSchema = new Schema({
  title: {
    type: Schema.Types.String,
  },
  image: {
    type: Schema.Types.String,
  },
  description: {
    type: Schema.Types.String,
  },
  sortDescription: {
    type: Schema.Types.String,
  },

  slug: {
    type: String,
    slug: "title",
    lowercase: true,
    default: " ",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// BlogModelSchema.pre("save", function(next) {
//   this.slug = this.title.split(" ").join("-");
//   next();
// });

// BlogModelSchema.pre("save", function (next) {
//   this.slug = slugify(this.title);
//   next();
// })

const BlogModel = mongoose.model("blog", BlogModelSchema);
module.exports = BlogModel;
