/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as assert from "power-assert";

import { extractArgs } from "../lib/command";

describe("command", () => {

    describe("extractArgs", () => {

        it("should parse parameter value pairs", () => {
            const pvs = ["mavis=staples", "cleotha=staples", "pervis=staples", "roebuck=pops"];
            const args = extractArgs(pvs);
            assert.equal(args.length, pvs.length);
            assert.equal(args[0].name, "mavis");
            assert.equal(args[0].value, "staples");
            assert.equal(args[1].name, "cleotha");
            assert.equal(args[1].value, "staples");
            assert.equal(args[2].name, "pervis");
            assert.equal(args[2].value, "staples");
            assert.equal(args[3].name, "roebuck");
            assert.equal(args[3].value, "pops");
        });

        it("should parse values with equal signs", () => {
            const pvs = ["staples=cleotha=mavis=pervis=pops"];
            const args = extractArgs(pvs);
            assert.equal(args.length, pvs.length);
            assert.equal(args[0].name, "staples");
            assert.equal(args[0].value, "cleotha=mavis=pervis=pops");
        });

        it("should parse parameters without value to undefined", () => {
            const pvs = ["cleotha", "mavis", "pervis", "pops"];
            const args = extractArgs(pvs);
            assert.equal(args.length, pvs.length);
            assert.equal(args[0].name, "cleotha");
            assert.equal(args[0].value, undefined);
            assert.equal(args[1].name, "mavis");
            assert.equal(args[1].value, undefined);
            assert.equal(args[2].name, "pervis");
            assert.equal(args[2].value, undefined);
            assert.equal(args[3].name, "pops");
            assert.equal(args[3].value, undefined);
        });

        it("should parse parameters with empty values to empty strings", () => {
            const pvs = ["cleotha=", "mavis=", "pervis=", "pops="];
            const args = extractArgs(pvs);
            assert.equal(args.length, pvs.length);
            assert.equal(args[0].name, "cleotha");
            assert.equal(args[0].value, "");
            assert.equal(args[1].name, "mavis");
            assert.equal(args[1].value, "");
            assert.equal(args[2].name, "pervis");
            assert.equal(args[2].value, "");
            assert.equal(args[3].name, "pops");
            assert.equal(args[3].value, "");
        });

    });

});
