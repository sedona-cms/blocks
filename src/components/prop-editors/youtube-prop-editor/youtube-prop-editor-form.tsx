import Vue, { VNode } from 'vue'

function getYoutubeId(url: string): string {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length == 11 ? match[7] : ''
}

export default Vue.extend({
  name: 'YoutubePropEditorForm',
  data() {
    return {
      link: '' as string,
      videoId: '' as string,
    }
  },
  computed: {
    embeddedLink(): string {
      return this.videoId ? `https://www.youtube.com/embed/${this.videoId}` : ''
    },
  },
  watch: {
    link(value: string): void {
      this.videoId = getYoutubeId(value)
      if (this.videoId !== '') {
        this.$emit('change', this.embeddedLink)
      }
    },
  },
  render(): VNode {
    const player =
      this.embeddedLink !== '' ? (
        <iframe
          src={this.embeddedLink}
          width="100%"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      ) : undefined

    return (
      <div class="q-pa-md">
        <q-input
          label="Youtube video link"
          value={this.link}
          outlined={true}
          dark={true}
          on-input={value => (this.link = value)}
        />
        <br />
        {player}
      </div>
    )
  },
})
