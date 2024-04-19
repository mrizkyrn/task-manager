export const ISOtoReadable = (ISOdate) => {
   const date = new Date(ISOdate);
   const options = { year: 'numeric', month: 'long', day: 'numeric' };
   return date.toLocaleDateString('en-US', options);
};

export const ISOtoTime = (ISOdate) => {
   const date = new Date(ISOdate);
   const options = { hour: 'numeric', minute: 'numeric' };
   return date.toLocaleTimeString('en-US', options);
}

export const ISOtoDateTime = (ISOdate) => {
   const date = new Date(ISOdate);
   const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
   return date.toLocaleDateString('en-US', options);
};

export const ISOtoLocalDate = (ISOdate) => {
   if (!ISOdate) return '';
   const newDate = new Date(ISOdate);
   const offset = newDate.getTimezoneOffset() * 60000;
   return new Date(newDate - offset).toISOString().slice(0, -1);
};

export const overdueISOCheck = (ISOdate) => {
   const date = new Date(ISOdate);
   return date < Date.now();
};

export const overdueCheck = (date) => {
   return date < Date.now();
};