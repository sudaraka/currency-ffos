/**
 * ajax.js: helper for making AJAX requests
 *
 * Copyright 2014 Sudaraka Wijesinghe <sudaraka.org/contact>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

var Ajax = function() {
    'use strict';

    var http_request = new XMLHttpRequest({
        mozSystem: true
    });

    if(!http_request)
        return null;

    return {
        get: function(url, callback) {
            http_request.onreadystatechange = function() {
                if(callback && 4 === http_request.readyState) {
                    var result = {
                        code: 0,
                        message: '',
                        data: null
                    };

                    if(200 === http_request.status) {
                        switch(http_request.responseType) {
                            case 'text/json': {
                                result.data = JSON.parse(http_request.response);

                                break;
                            }
                            default: {
                                result.data = http_request.response;
                            }
                        }
                    }
                    else {
                        result.code = http_request.status;
                        result.message = http_request.statusText;
                        result.data = http_request.responseText;
                    }

                    callback(result);
                }
            };

            http_request.open('GET', url);
            http_request.send();
        }
    };
}();

