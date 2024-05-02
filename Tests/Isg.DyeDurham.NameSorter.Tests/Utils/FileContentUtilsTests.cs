
using Isg.DyeDurham.NameSorter.Lib.Exceptions;
using Isg.DyeDurham.NameSorter.Lib.Models;
using Isg.DyeDurham.NameSorter.Lib.Utils;

namespace Isg.DyeDurham.NameSorter.Tests.Engines
{
    [TestClass]
    public class FileContentUtilsTests
    {
        [TestMethod]
        public void Test_ReadLines_Null_With_ExpectedOutput()
        {
            // Arrange
            string rawExpectedFileContent = null;

            // Act
            if (FileContentUtils.TryReadLines(rawExpectedFileContent, out string[] expectedLines, out Exception? reason))
                throw new Exception(); // failed test


            // Assert
            Assert.IsTrue(reason != null);
        }

        [TestMethod]
        public void Test_ReadLines_Empty_With_ExpectedOutput()
        {
            // Arrange
            string rawExpectedFileContent = "";

            // Act
            FileContentUtils.TryReadLines(rawExpectedFileContent, out string[] expectedLines, out Exception? reason);

            // Assert
            Assert.AreEqual(expectedLines.Length, 0);
        }

        [TestMethod]
        public void Test_ReadLines_EmptyWhiteSpaces_With_ExpectedOutput()
        {
            // Arrange
            string rawExpectedFileContent = "   ";

            // Act
            FileContentUtils.TryReadLines(rawExpectedFileContent, out string[] expectedLines, out Exception? reason);

            // Assert
            Assert.AreEqual(expectedLines.Length, 1);
        }

        [TestMethod]
        public void Test_ReadLines_OneNameNoReturns_With_ExpectedOutput()
        {
            // Arrange
            string rawExpectedFileContent = "Hello World";
            string expectedFirstLine = "Hello World";

            // Act
            FileContentUtils.TryReadLines(rawExpectedFileContent, out string[] expectedLines, out Exception? reason);

            // Assert
            Assert.AreEqual(expectedLines.Length, 1);
            Assert.AreEqual(expectedLines.First(), expectedFirstLine);
        }

        [TestMethod]
        public void Test_ReadLines_OneNameWithReturn_With_ExpectedOutput()
        {
            // Arrange
            string rawExpectedFileContent = "Hello World\r\n";
            string expectedFirstLine = "Hello World";

            // Act
            FileContentUtils.TryReadLines(rawExpectedFileContent, out string[] expectedLines, out Exception? reason);

            // Assert
            Assert.AreEqual(expectedLines.Length, 1);
            Assert.AreEqual(expectedLines.First(), expectedFirstLine);
        }

        [TestMethod]
        public void Test_ReadLines_TwoNames_With_ExpectedOutput()
        {
            // Arrange
            string rawExpectedFileContent = "Hello World\r\nWorld Hello\r\n";
            string expectedFirstLine = "Hello World";
            string expectedSecondLine = "World Hello";

            // Act
            FileContentUtils.TryReadLines(rawExpectedFileContent, out string[] expectedLines, out Exception? reason);

            // Assert
            Assert.AreEqual(expectedLines.Length, 2);
            Assert.AreEqual(expectedLines.First(), expectedFirstLine);
            Assert.AreEqual(expectedLines.Last(), expectedSecondLine);
        }

        [TestMethod]
        public void Test_ReadLines_TwoNamesWithReturns_With_ExpectedOutput()
        {
            // Arrange
            string rawExpectedFileContent = "\r\n\r\nHello World\r\nWorld Hello\r\n";
            string expectedFirstLine = "Hello World";
            string expectedSecondLine = "World Hello";

            // Act
            FileContentUtils.TryReadLines(rawExpectedFileContent, out string[] expectedLines, out Exception? reason);

            // Assert
            Assert.AreEqual(expectedLines.Length, 2);
            Assert.AreEqual(expectedLines.First(), expectedFirstLine);
            Assert.AreEqual(expectedLines.Last(), expectedSecondLine);
        }


        [TestMethod]
        public void Test_ReadLines_ThreeNames_With_ExpectedOutput()
        {
            // Arrange
            string rawExpectedFileContent = "Hello World\r\nWorld Hello\r\nIntermediate";
            string expectedFirstLine = "Hello World";
            string expectedSecondLine = "World Hello";
            string expectedLastLine = "Intermediate";

            // Act
            FileContentUtils.TryReadLines(rawExpectedFileContent, out string[] expectedLines, out Exception? reason);

            // Assert
            Assert.AreEqual(expectedLines.Length, 3);
            Assert.AreEqual(expectedLines.First(), expectedFirstLine);
            Assert.AreEqual(expectedLines[1], expectedSecondLine);
            Assert.AreEqual(expectedLines.Last(), expectedLastLine);
        }

        [TestMethod]
        public void Test_ReadLines_ThreeNamesWithReturns_With_ExpectedOutput()
        {
            // Arrange
            string rawExpectedFileContent = "\r\n\r\nHello World\r\nWorld Hello\r\nIntermediate\r\n";
            string expectedFirstLine = "Hello World";
            string expectedSecondLine = "World Hello";
            string expectedLastLine = "Intermediate";

            // Act
            FileContentUtils.TryReadLines(rawExpectedFileContent, out string[] expectedLines, out Exception? reason);

            // Assert
            Assert.AreEqual(expectedLines.Length, 3);
            Assert.AreEqual(expectedLines.First(), expectedFirstLine);
            Assert.AreEqual(expectedLines[1], expectedSecondLine);
            Assert.AreEqual(expectedLines.Last(), expectedLastLine);
        }
    }
}