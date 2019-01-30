export const imageUpload = {
  handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
    var formData = new FormData()
    formData.append('file', file)

    this.$store.dispatch('imagesUpload/upload', { data: formData, 
      callback(result){
        Editor.insertEmbed(cursorLocation, 'image', result.url)
        resetUploader()
      }
    })
  }
}