require "swagger_helper"

RSpec.describe "Health", type: :request do
  path "/ping" do
    get "Ping the API" do
      tags "Health"
      produces "application/json"

      response "200", "ok",
        content: {
          "application/json" => {
            schema: {
              type: :object,
              properties: {
                status: {type: :string}
              },
              required: %w[status]
            },
            example: {status: "ok"}
          }
        } do
        run_test!
      end
    end
  end
end
