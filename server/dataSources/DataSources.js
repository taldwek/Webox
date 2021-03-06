const MongoClient = require('./MongoClient')
const TwitchAPI = require('./TwitchAPI')
const InstagramAPI = require('./InstagramAPI')
const YouTubeAPI = require('./YouTubeAPI')

class DataSources {
  constructor() {
    this.mongoClient = new MongoClient()
    this.twitchAPI = new TwitchAPI()
    this.instagramAPI = new InstagramAPI()
    this.youtubeAPI = new YouTubeAPI()
  }

  async getCreatorLinksByid(id) {
    const creator = await this.mongoClient.getCreatorById(id)
    const [instagramPostId, youtubeVideoId] = await Promise
      .all([
        this.instagramAPI.getRecentPostByRef(creator.instagram),
        this.youtubeAPI.getYoutubeLatestByRef(creator.youtube)
      ])
    return {
      imgUrl: creator.img,
      twitchName: creator.twitch,
      twitterName: creator.twitter,
      youtubeVideoId,
      instagramPostId
    }
  }

  async findNewCreator(creator) {

    return {
      imgUrl: creator.img,
      twitchName: creator.twitch,
    }
  }
}

const dataSources = new DataSources()
module.exports = dataSources