#Public API

## Get Articles

* **URL**

  `/api/v1/public/articles`
* **Method:**

  `GET`
*  **URL Params**

   **Headers:**

   `language = [String]`

   `key = [String]`

* **Success Response:**

    * **Code:** `200` <br />
      **Content:**
```sh
  {  
      TimeFormat: "h:mma",
      LB_TIMEZONE: "The event time is shown as GMT+2",
      ARTICLES: [
        {
          _id_: "Article _id",
          publishDate: "Article publish date",
          author: "Article author",
          title: "Arcticle title",
          subtitle: "Arcticle description",
          data: "Arcticle RTE data",
          imagePath: "Arcticle image path",
        }
      ]  
  }
```

## Get Articles

* **URL**

  `/api/v1/public/articles/:id`
* **Method:**

  `GET`
*  **URL Params**

   **Required:**

   `id=[String]`

   **Headers:**

   `language = [String]`

   `key = [String]`

* **Success Response:**

    * **Code:** `200` <br />
      **Content:**
```sh
  {  
      TimeFormat: "h:mma",
      LB_TIMEZONE: "The event time is shown as GMT+2",
      ARTICLES: [
        {
          _id_: "Article _id",
          publishDate: "Article publish date",
          author: "Article author",
          title: "Arcticle title",
          subtitle: "Arcticle description",
          data: "Arcticle RTE data",
          imagePath: "Arcticle image path",
        }
      ]  
  }
```