export const COMMAND_PAYLOADS = {
  widya_start: "widya_start",
  widya_birthday_count: "widya_birthday_count",
  widya_goodbye: "widya_goodbye",
};

export const WIDYA_REPLIES = [
  {
    title: "firstname",
    payload: "Hi! My name is Widya. I don't think we've met before, may I know your first name?",
  },
  {
    title: "birthday",
    payload: "May I know your birthdate? (YYYY-MM-DD)",
  },
  {
    title: "service",
    payload: "Would you like to know how many days it is until your birthday?",
  },
  {
    title: "goodbye",
    payload: "Goodbye!",
  },
];

export const QUICK_REPLIES = [
  { content_type: "text", title: "yes", payload: "reply_yes" },
  { content_type: "text", title: "no", payload: "reply_no" },
];
