import { MessageInfoType, Mode } from "../fhl-chat-gpt/index.interface";

export const mockedInfo = {
  mode: Mode.Starter,
  userMe: {
    name: "Adam",
    status: "Available",
    calendar: [
      {
        title: "FHL kick-off meeting",
        startTime: "2/13/2023 11:00",
        endTime: "2/13/2023 12:00",
        checked: true
      },
      {
        title: "fhl workstream division",
        startTime: "2/13/2023 14:00",
        endTime: "2/13/2023 15:00",
        checked: true
      }
    ]
  },
  userTarget: { name: "Bella", status: "Available" },
  relatedConversations: [
    {
      messages: [
        { name: "Lala", message: "I was not able to see output on AML" },
        { name: "Adam", message: "Let's schedule a meeting with Bella to discuss this issue." }
      ],
      checked: true
    },
    {
      messages: [
        { name: "Adam", message: "Hi Cindy, do you know Smart Reply?" },
        {
          name: "Cindy",
          message: "Not really, but I know Bella is an expert in Smart Reply, you can talk to her."
        },
        { name: "Adam", message: "Sure!" }
      ],
      checked: true
    },
    {
      messages: [
        {
          name: "somebody",
          message: "I will get clear on requirements before you send over to Bella"
        },
        {
          name: "Adam",
          message:
            "Great, I'm glad to hear that you'll be clarifying the requirements. I will be sure to send it to Bella as soon as it is ready."
        }
      ],
      checked: true
    }
  ],
  recentConversations: [[]] as [MessageInfoType[]?],
  receivedMessage: "",
  currentTime: "2/13/2023 13:45"
};
