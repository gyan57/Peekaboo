/**
 * Created by Gkumar on 3/4/16.
 */
(function() {
    'use strict';

    angular.module('peekaboo')
        //Overview controller to get details of Cloud,Instance(Windows,Linux)
        .controller('overviewCtrl', overviewCtrl);

    overviewCtrl.$inject = ['$log','$scope','apiServices'];

    function overviewCtrl($log,$scope, apiServices) {

        //State Array to be used
        var stateArray = ['UnKnown', 'Starting', 'Running', 'Paused', 'Stopping', 'Stopped', 'Destroyed', 'Failed', 'Degraded'];
        var cloud = [];
        var cloudArray = [];
        var displayArray = [];
        var instance = [];
        var year;
        var days = [];
        var weeks = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
        var months = [];
        var state = ['Starting', 'Running', 'Paused', 'Stopping', 'Stopped', 'Failed', 'Degraded'];
        var linuxCount = 0;
        var windowsCount = 0;
        var toNumOfVM = 0;
        var finalLinuxCount = 0;
        var finalWindowsCount = 0;

        ///Creating details for charts...
        $scope.pieChartDetails = [];
        $scope.barChartDetails = [];

        //get details for Overview page
        apiServices.getClouds()
            .then(function(data) {
                countAssets(data);
            });

        var countAssets = function (data) {

            //Sort data for display purpose
            data.forEach(function (data) {
                if (cloud.indexOf(data.cloud) == -1) {
                    cloud.push(data.cloud);
                    cloudArray.push({
                            cloudName : data.cloud,
                            numOfWindows : windowsCount,
                        numOfLinux: linuxCount,
                        toNumOfVM: toNumOfVM
                    });
                    if(data.hostname == 0)
                    {
                        //
                    } else
                    {
                        instance.push({
                            cloud: data.cloud,
                            hostname : data.hostname,
                            OSType : data.OSType,
                            state : data.state,
                            startTime: data.startTime
                        });
                    }
                } else if (cloud.indexOf(data.cloud) >= 0) {
                    instance.push({
                        cloud: data.cloud,
                        hostname : data.hostname,
                        OSType : data.OSType,
                        state : data.state,
                        startTime: data.startTime
                    });
                }
            });

            //Count Number of Vm's according tp Operating system
            cloudArray.forEach(function (cloudData) {
                linuxCount = 0;
                windowsCount = 0;
                instance.forEach(function (data) {
                    if (data.OSType.substring(0, 5) == 'Linux' && cloudData.cloudName == data.cloud)
                    {
                        linuxCount++;
                    }
                    else if (data.OSType.substring(0, 7) == 'Windows' && cloudData.cloudName == data.cloud)
                    {
                        windowsCount++;
                    }
                });
                finalLinuxCount += linuxCount;
                finalWindowsCount += windowsCount;
                cloudData.numOfWindows = windowsCount;
                cloudData.numOfLinux = linuxCount;
                cloudData.toNumOfVM = linuxCount + windowsCount;
            });

            //Count Number of Vm's for this weeks from Monday till Current day
            cloudArray.forEach(function (cloudData) {
                days = [];
                weeks = [];
                months = [];
                var date = new Date();
                year = date.getYear();
                instance.forEach(function (data) {
                    if (Date.parse(data.startTime) - Date.parse(date) > 3000000) {

                    }
                })
            });

            $scope.cloudArray = cloudArray;

            var windowsCountArray = getVMStateCounts('Windows', instance);
            var linuxCountArray = getVMStateCounts('Linux', instance);
            var totalCountArray = [];
            for (var i = 0; i <= 6; i++) {
                totalCountArray.push(windowsCountArray[i] + linuxCountArray[i])
            }

            createPieCharts(0, 'Clouds', ["Clouds"], [cloud.length], "Random");
            createPieCharts(1, 'Instances', ["Windows", "Linux"], [finalWindowsCount, finalLinuxCount], "Random");
            createPieCharts(2, 'Windows', state, windowsCountArray, "Random");
            createPieCharts(3, 'Linux', state, linuxCountArray, "Random");
            createPieCharts(4, 'All CLoud', state, totalCountArray, "Random");
            createBarCharts('Instances', ["Windows", "Linux"], [[finalWindowsCount], [finalLinuxCount]], "Random");
        };

        var getVMStateCounts = function (OSType, instance) {

            var startingVM = 0;
            var runningVM = 0;
            var pausedVM = 0;
            var stoppingVM = 0;
            var stoppedVM = 0;
            var failedVM = 0;
            var degradedVM = 0;
            //Count Number of Vm's according tp Operating system
            //cloudArray.forEach(function (cloudData) {
            instance.forEach(function (data) {
                if (data.OSType.split('|', 1)[0] == OSType) {
                    if (stateArray[data.state] == 'Starting') {
                        startingVM++;
                    } else if (stateArray[data.state] == 'Running') {
                        runningVM++;
                    } else if (stateArray[data.state] == 'Paused') {
                        pausedVM++;
                    } else if (stateArray[data.state] == 'Stopping') {
                        stoppingVM++;
                    } else if (stateArray[data.state] == 'Stopped') {
                        stoppedVM++;
                    } else if (stateArray[data.state] == 'Failed') {
                        failedVM++;
                    } else if (stateArray[data.state] == 'Degraded') {
                        degradedVM++;
                    }

                }
            });
            //});

            $log.debug("Starting VM Count", startingVM + runningVM + pausedVM + stoppingVM + stoppedVM + failedVM + degradedVM);
            return [startingVM, runningVM, pausedVM, stoppingVM, stoppedVM, failedVM, degradedVM]

        };

        var createPieCharts = function (i, name, label, count, color) {

            // Set the details for chat generation of Cloud
            $scope.pieChartDetails[i] =
            {
                name: name,
                data: count,
                label: label,
                color: ["#F7464A"]
            };

            $log.debug("Chart details log", $scope.pieChartDetails[i]);

            $scope.pieChartDetails[i].option = {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,

                //String - The colour of each segment stroke
                segmentStrokeColor: "#fff",

                //Number - The width of each segment stroke
                segmentStrokeWidth: 0,

                scaleBackdropColor: "rgba(255,255,225,0.75)",

                //Number - The percentage of the chart that we cut out of the middle
                percentageInnerCutout: 0, // This is 0 for Pie charts

                //Number - Amount of animation steps
                animationSteps: 100,

                //String - Animation easing effect
                animationEasing: "linear",

                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate: true,

                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale: true,

                //String - A legend template
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++)" +
                "{%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label)" +
                "{%><%=segments[i].label%><%}%></li><%}%></ul>"
            };
        };

        var createBarCharts = function (name, series, count, color) {

            // Set the details for chat generation of Cloud
            $scope.barChartDetails =
            {
                name: name,
                data: count,
                label: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
                series: series
            };

            $log.debug("Chart details log for bar chart", $scope.barChartDetails.label.length);

            $scope.barChartDetails.option = {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,

                //String - The colour of each segment stroke
                segmentStrokeColor: "#fff",

                //Number - The width of each segment stroke
                segmentStrokeWidth: 0,

                scaleBackdropColor: "rgba(255,255,225,0.75)",

                //Number - Amount of animation steps
                animationSteps: 100,

                //String - Animation easing effect
                animationEasing: "linear",

                //String - A legend template
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++)" +
                "{%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label)" +
                "{%><%=segments[i].label%><%}%></li><%}%></ul>"
            };
        }
    }
})();