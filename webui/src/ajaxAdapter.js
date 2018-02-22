import projectDiary from './projectDiary';

// TODO MUST this is HARD code and is ugly as hell :p we'll fix it!
const baseUrl = /deividy\.com/.test(window.location.href) ?
                                          'https://pdiary-api.deividy.com' :
                                          'http://localhost:9001';

class AjaxAdapter {
  async doRequest (url, method, body) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const userState = projectDiary.redux.getState('user');
    if (userState) {
      headers['Authorization'] = `Bearer ${userState.jwt}`;
    }

    const res = await fetch(`${baseUrl}/${url}`, {
      method, body, headers,
      mode: 'cors'
    });

    // forbidden or unauthorized
    if (res.status === 401 || res.status === 403) {
      projectDiary.redux.user.actions.logout();
    }

    return res;
  }

  async get (url, postData) {
    const res = await this.doRequest(url, 'GET', JSON.stringify(postData));
    if (res.status !== 200 && res.status !== 409) throw new Error(res.status);

    const jsonResponse = await res.json();
    return { json: jsonResponse };
  }

  async post (url, postData) {
    const res = await this.doRequest(url, 'POST', JSON.stringify(postData));
    const authorization = res.headers.get('authorization');

    let jwt;
    if (authorization) {
      jwt = authorization.replace('Bearer ', '');
    }

    const jsonResponse = await res.json();

    if (res.status !== 200 && res.status !== 201 && jsonResponse.msg) {
      throw new Error(jsonResponse.msg);
    }

    return { json: jsonResponse, jwt };
  }
}

export default function () { return new AjaxAdapter(); };
