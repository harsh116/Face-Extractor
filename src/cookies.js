const setCookies = (cname, cvalue, expdays = 1) => {
  // const expdays = 365;

  const d = new Date();
  d.setTime(d.getTime() + expdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  console.log("expires: ", d);

  document.cookie = cname + "=" + cvalue + ";" + expires + ";" + "path=/";
};

const setCookieResetDaily = (cname, cvalue) => {
  const d = new Date();
  d.setHours(24, 0, 0, 0); // next midnight
  console.log("reset daily: ", d);
  let expires = "expires=" + d.toUTCString();

  document.cookie = cname + "=" + cvalue + ";" + expires + ";" + "path=/";
};

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);

  let ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "{}";
};

export { setCookies, getCookie, setCookieResetDaily };
