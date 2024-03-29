function processImagetoText() {
  var subscriptionKey = "8f01ddd74efe4b30ae373787a3fb7bde";

  var uriBase =
    "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

  // Request parameters.
  var params = {
    visualFeatures: "Categories,Description,Color",
    details: "",
    language: "en"
  };

  // Display the image.
  var sourceImageUrl = document.getElementById("inputImage").value;
  document.querySelector("#sourceImage").src = sourceImageUrl;

  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}'
  })
    .done(function(data) {
      console.log(data);
      // Show formatted JSON on webpage.
      var temp = data;
      //var temp = JSON.stringify(data, null, 2);
      console.log(temp["description"]);
      if (temp["description"]["captions"][0]["text"]) {
        $("#responseTextArea").val(temp["description"]["captions"][0]["text"] + " (Accuracy: " + temp["description"]["captions"][0]["confidence"] + ")");
      } else {
        $("#responseTextArea").val(temp["description"]["tags"][0]);
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString =
        errorThrown === ""
          ? "Error. "
          : errorThrown + " (" + jqXHR.status + "): ";
      errorString +=
        jqXHR.responseText === ""
          ? ""
          : jQuery.parseJSON(jqXHR.responseText).message;
      alert(errorString);
    });
}
