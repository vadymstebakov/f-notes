export const localStorageClient = key => {
  return {
    save: data => {
      return new Promise(resolve => {
        localStorage.setItem(key, JSON.stringify(data));
        resolve({
          status: 'OK'
        });
      }).catch(error => {
        console.error(error.message);
      });
    },
    get: () => {
      return new Promise(resolve => {
        resolve(JSON.parse(localStorage.getItem(key)));
      }).catch(error => {
        console.error(error.message);
      });
    }
  };
};
