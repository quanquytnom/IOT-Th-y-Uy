/**
 * @swagger
 * tags:
 *   name: General
 *   description: API for general operations like user retrieval, data sensors, and action history
 */

/**
 * @swagger
 * /general/user/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [General]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 country:
 *                   type: string
 *                 occupation:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 transactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                 role:
 *                   type: string
 *                   enum: [user, admin, superadmin]
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * /general/datasensor:
 *   get:
 *     summary: Retrieve data sensors
 *     tags: [General]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: The page number for pagination
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         required: false
 *         description: The number of records per page
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sort
 *         in: query
 *         required: false
 *         description: Sorting criteria for the results
 *         schema:
 *           type: string
 *           default: '{"field":"createdAt","sort":"desc"}'  # Ví dụ về sorting
 *       - name: search
 *         in: query
 *         required: false
 *         description: Search value for filtering the results (temperature, humidity, light, dust)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of data sensors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dataSenSors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       temperature:
 *                         type: number
 *                       humidity:
 *                         type: number
 *                       light:
 *                         type: number
 *                       dust:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: integer
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /general/actionhistory:
 *   get:
 *     summary: Retrieve action history
 *     tags: [General]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: The page number for pagination
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         required: false
 *         description: The number of records per page
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sort
 *         in: query
 *         required: false
 *         description: Sorting criteria for the results (e.g., {"field":"createdAt","sort":"desc"})
 *         schema:
 *           type: string
 *           default: '{"field":"createdAt","sort":"desc"}'
 *       - name: search
 *         in: query
 *         required: false
 *         description: Search term for filtering action history by deviceName or action
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Action history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 actionHistory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       deviceName:
 *                         type: string
 *                       action:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: integer
 *       404:
 *         description: No action history found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /general/actionhistory:
 *   post:
 *     summary: Save action history
 *     tags: [General]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceName:
 *                 type: string
 *                 description: The name of the device
 *               action:
 *                 type: string
 *                 description: The action performed (e.g., "on", "off")
 *     responses:
 *       201:
 *         description: Action history saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the saved action history
 *                 deviceName:
 *                   type: string
 *                 action:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Server error
 */
