/*
 * Summary: Tests the NameUtils class.
 * 
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */
using Isg.DyeDurham.NameSorter.Lib.Exceptions;
using Isg.DyeDurham.NameSorter.Lib.Models;
using Isg.DyeDurham.NameSorter.Lib.Utils;

namespace Isg.DyeDurham.NameSorter.Tests.Engines
{
    [TestClass]
    public class NameUtilsTests
    {
        [TestMethod]
        public void Test_Get_NullName_With_NameProcessException()
        {
            // Arrange
            string rawName = null;

            // Act
            try
            {
                NameUtils.Get(rawName);
            }
            catch (NameProcessException ex)
            {
                // Assertion of NameProcessException
            }
        }

        [TestMethod]
        public void Test_Get_EmptyName_With_NameProcessException()
        {
            // Arrange
            string rawName = "";

            // Act
            try
            {
                NameUtils.Get(rawName);
            }
            catch (NameProcessException ex)
            {
                // Assertion of NameProcessException
            }
        }


        [TestMethod]
        public void Test_Get_WhiteSpaceName_With_NameProcessException()
        {
            // Arrange
            string rawName = " ";

            // Act
            try
            {
                NameUtils.Get(rawName);
            }
            catch (NameProcessException ex)
            {
                // Assertion of NameProcessException
            }
        }

        [TestMethod]
        public void Test_Get_SingleName1_With_ExpectedHello()
        {
            // Arrange
            string rawName = "Hello";

            // Act
            Name name = NameUtils.Get(rawName);

            // Assert
            Assert.AreEqual(name.NameArguments.Length, 1);
            Assert.AreEqual(name.NameArguments.First(), rawName);
        }

        [TestMethod]
        public void Test_Get_SingleName1WithSpaces_With_ExpectedHello()
        {
            // Arrange
            string rawName = "   Hello ";
            string expectedResult = "Hello";

            // Act
            Name name = NameUtils.Get(rawName);

            // Assert
            Assert.AreEqual(name.NameArguments.Length, 1);
            Assert.AreEqual(name.NameArguments.First(), expectedResult);
        }

        [TestMethod]
        public void Test_Get_HelloWorld_With_ExceptedHelloWorld()
        {
            // Arrange
            string rawName = "Hello World";
            string expectedHello = "Hello";
            string expectedWorld = "World";

            // Act
            Name name = NameUtils.Get(rawName);

            // Assert
            Assert.AreEqual(name.NameArguments.Length, 2);
            Assert.AreEqual(name.NameArguments.First(), expectedHello);
            Assert.AreEqual(name.NameArguments.Last(), expectedWorld);
        }


        [TestMethod]
        public void Test_Get_HelloIntermediate_World_With_ExceptedHelloWorld()
        {
            // Arrange
            string rawName = "Hello Intermeiate World";
            string expectedHello = "Hello";
            string expectedIntermeiate = "Intermeiate";
            string expectedWorld = "World";

            // Act
            Name name = NameUtils.Get(rawName);

            // Assert
            Assert.AreEqual(name.NameArguments.Length, 3);
            Assert.AreEqual(name.NameArguments.First(), expectedHello);
            Assert.AreEqual(name.NameArguments[1], expectedIntermeiate);
            Assert.AreEqual(name.NameArguments.Last(), expectedWorld);
        }

        [TestMethod]
        public void Test_Get_HelloIntermediateWhiteSpaces_World_With_ExceptedHelloWorld()
        {
            // Arrange
            string rawName = "    Hello Intermeiate   World     ";
            string expectedHello = "Hello";
            string expectedIntermeiate = "Intermeiate";
            string expectedWorld = "World";

            // Act
            Name name = NameUtils.Get(rawName);

            // Assert
            Assert.AreEqual(name.NameArguments.Length, 3);
            Assert.AreEqual(name.NameArguments.First(), expectedHello);
            Assert.AreEqual(name.NameArguments[1], expectedIntermeiate);
            Assert.AreEqual(name.NameArguments.Last(), expectedWorld);
        }
    }
}