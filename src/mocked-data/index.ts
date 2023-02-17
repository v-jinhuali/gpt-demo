import { MessageInfoType } from "../fhl-chat-gpt/index.interface";

export const mockedInfo = {
  userMe: { name: "Adam Wang", status: "Available" },
  userTarget: { name: "Bella Liu", status: "In a meeting" },
  meetings: [
    { title: "FHL kick-off meeting", startTime: "2/16/2023 11:00", endTime: "2/16/2023 12:00" },
    { title: "fhl workstream division", startTime: "2/16/2023 14:00", endTime: "2/16/2023 15:00" }
  ],
  relatedConversations: [
    [
      { name: "Adam Wang", message: "Hi Cindy, do you know Smart Reply?" },
      {
        name: "Cindy",
        message: "Not really, but I know Bella is an expert in Smart Reply, you can talk to her."
      },
      { name: "Adam Wang", message: "Sure!" }
    ],
    [
      {
        name: "somebody",
        message: "I will get clear on requirements before you send over to Bella"
      },
      {
        name: "Adam Wang",
        message:
          "Great, I'm glad to hear that you'll be clarifying the requirements. I will be sure to send it to Bella as soon as it is ready."
      }
    ]
  ],
  recentConversations: [
    [
      { name: "Adam Wang", message: "Hi" },
      { name: "somebody", message: "hello" }
    ]
  ] as [MessageInfoType[]?]
};
