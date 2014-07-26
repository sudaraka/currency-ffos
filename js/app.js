/**
 * app.js: starting point of the currency convert application
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
(function() {
    'use strict';

    // fill_currency_select(select_id) {{{
    /**
     * Create a function that will fill the given select element's options with
     * the currency list stored in the cache.
     *
     * When the cache is empty the function will fetch data with and API call to
     * a remote resource and initialize the cache, afterwards the function will
     * be recalled to populate the select.
     *
     * NOTE: any existing option elements in the select will be removed.
     */
    var fill_currency_select = function() {
        var currency_cache;

        // Closure for the currency_cache
        var _fill_currency_select = function(select_id) {
            if(!currency_cache) {
                // When the cache empty, initialize cache instead of filling the
                // select element.
                currency_cache = [
                    {code: 'UDS', name: 'US Dollar'},
                    {code: 'EUR', name: 'Euro'},
                    {code: 'LKR', name: 'Sri Lankan Rupee'},
                ];

                _fill_currency_select(select_id);

                return false;
            }

            var select = document.getElementById(select_id);

            // Populate select element from cache
            for(var cache_index in currency_cache) {
                var currency = currency_cache[cache_index];

                select.options[select.options.length] = new Option(
                    currency.name,
                    currency.code
                );
            }

            return true;
        };

        // Return the closure with cache in scope
        return _fill_currency_select;
    }();
    // }}}

    // Fill currency select elements
    fill_currency_select('cur_from');
    fill_currency_select('cur_to');

}());
